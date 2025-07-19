// app/lib/actions.ts
'use server';

import postgres from 'postgres';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require'})


const MembershipSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  planId: z.string(),
  planName: z.string(),
  price: z.number(),
});

export async function createMembership(userData: {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  planId: string;
  planName: string;
  price: number;
}) {
  try {
    // Use the proper transaction method for serverless environments
    const result = await sql.begin(async (sql) => {
      // 1. First upsert the user
      await sql`
        INSERT INTO users (id, name, email, phone, address)
        VALUES (
          ${userData.userId}, 
          ${userData.name}, 
          ${userData.email}, 
          ${userData.phone}, 
          ${userData.address}
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          email = EXCLUDED.email,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          updated_at = NOW()
      `;

      // 2. Then insert the membership
      const [membership] = await sql`
        INSERT INTO memberships (
          user_id, name, email, phone, address,
          plan_id, plan_name, price, start_date, end_date, status
        ) VALUES (
          ${userData.userId}, 
          ${userData.name}, 
          ${userData.email}, 
          ${userData.phone}, 
          ${userData.address}, 
          ${userData.planId}, 
          ${userData.planName}, 
          ${userData.price}, 
          NOW(), 
          (NOW() + INTERVAL '1 month')::DATE, 
          'active'
        )
        RETURNING id
      `;

      return membership;
    });

    return { success: true, membershipId: result.id };
    
  } catch (error) {
    console.error('Database Error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Failed to create membership' 
    };
  }
}