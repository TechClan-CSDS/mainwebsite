import { connectToDatabase } from "../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, year, fact, number, usn, email } = data || {};

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields: name and email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("applications");

    // Normalize USN for comparison
    const normalizedUsn = typeof usn === 'string' ? usn.toUpperCase().replace(/\s+/g, '') : usn;

    // Check for existing user by email, number, or usn
    const conflict = await collection.findOne({
      $or: [
        { email },
        { number },
        { usn: normalizedUsn },
      ],
    });

    if (conflict) {
      // Determine which field conflicts
      let field = 'unknown';
      if (conflict.email === email) field = 'email';
      else if (conflict.number === number) field = 'number';
      else if (conflict.usn === normalizedUsn) field = 'usn';

      return new Response(JSON.stringify({ error: 'Duplicate entry', field }), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await collection.insertOne({ name, year, fact, number, usn: normalizedUsn, email, createdAt: new Date() });

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/applications error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("applications");

    const recent = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .project({ name: 1, email: 1, year: 1, createdAt: 1 })
      .toArray();

    return new Response(
      JSON.stringify({ db: db.databaseName, collection: "applications", recent }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("/api/applications GET error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
