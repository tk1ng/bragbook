import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/supabase-utils/adminClient';

export async function POST(request) {
    const formData = await request.formData();
    const email = formData.get('email');
    const type = formData.get('type') === 'recovery' ? 'recovery' : 'magiclink';

    const supabaseAdmin = getSupabaseAdminClient();

    const { data: linkData, error } = await supabaseAdmin.auth.admin.generateLink({
        type,
        email
    });

    if (error) {
        return NextResponse.redirect(new URL(`/error?type=${type}`, request.url), { status: 302 });
    }

    const { hashed_token: hashedToken } = linkData.properties;
    const constructedLink = new URL(`/auth/verify?hashed_token=${hashedToken}&type=${type}`, request.url);

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 54325
    });

    const initialSentence = type === 'recovery' ? 'Hi there, you requested a password change.' : ' Hi there, this is a custom magic link email';
    const sentenceEnding = type === 'recovery' ? 'change it' : 'log in';

    await transporter.sendMail({
        from: 'BragBook auth@bragbook.local',
        to: email,
        subject: 'Magic Link',
        html: `
        <h1> ${initialSentence}</h1>
        <p>Click <a href="${constructedLink.toString()}">here</a> to ${sentenceEnding}.</p>
        `,
    });

    const thanksUrl = new URL(`/magic-thanks?type=${type}`, request.url);
    return NextResponse.redirect(thanksUrl, { status: 302 });
}