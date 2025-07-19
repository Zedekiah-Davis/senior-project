import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchLatestMemberships() {
  try {
    const data = await sql`
      SELECT 
        id,
        name, 
        email, 
        phone, 
        address, 
        plan_name, 
        start_date, 
        end_date, 
        status,
        price
      FROM memberships
      ORDER BY start_date DESC
      LIMIT 5`;

    return data.map((membership) => ({
      ...membership,
      id: membership.id.toString(), // Ensure ID is a string
      start_date: new Date(membership.start_date).toLocaleDateString(),
      end_date: new Date(membership.end_date).toLocaleDateString(),
      price: membership.price, // Format price
      name: membership.name,
      email: membership.email,
      plan_name: membership.plan_name,
      status: membership.status,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest memberships.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchMembershipsPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM memberships
      WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        plan_name ILIKE ${`%${query}%`} OR
        price::text ILIKE ${`%${query}%`} OR
        start_date::text ILIKE ${`%${query}%`} OR
        end_date::text ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of memberships.');
  }
}