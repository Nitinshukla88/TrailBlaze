import { NextResponse } from "next/server";
import { prisma } from "../../../lib";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);

 const createToken = async (email:string, userId:number) => {
    return await new SignJWT({ email, userId, isAdmin: true }).setProtectedHeader({
        alg: 'HS256',
    }).setExpirationTime("48h").sign(secret);
 }

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if(!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required.' },
                { status: 400 }
            );
        }
        const user = await prisma.admin.findUnique({ where : { email, password } });
        if(!user) {
            return NextResponse.json(
                { message: 'Invalid email or password.' },
                { status: 401 }
            );
        } else {
            const token = await createToken(user.email, user.id);
            (await cookies()).set(
                "access_token", token
            );
            return NextResponse.json(
                {
                    userInfo: {
                        id: user.id,
                        email: user.email,
                    }
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { message : 'An unexpected error occurred while processing your request.' },
            { status: 500 }
        );
    }
    
}