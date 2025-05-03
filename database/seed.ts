import ImageKit from 'imagekit';
import dummyBooks from '../dummybooks.json'
import { books } from './schema';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

config({ path: 'env.local'})

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({client: sql});

const ImageKIt = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
})

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try{
        const response = await ImageKIt.upload({
            file: url,
            fileName,
            folder,
        })

    }catch(error){
        console.error("Error uploading image to ImageKIt:", error)
    }
};

const seed = async () => {
    console.log("Seedin data...")

    try{

        for (const book of dummyBooks){
            const coverUrl = (await uploadToImageKit(
                book.coverUrl,
                `${book.title}.jpg`,
                "/books/covers",
            )) as string;

            const videoUrl = (await uploadToImageKit(
                book.videoUrl,
                fileName: `${book.title}.mp4`,
                folder: "/books/videos",
            )) as string;

            await db.insert(books).values({
                ...book,
                coverUrl,
                videorl

        })
        }

        console.log("Data seeded successfully!")

    }catch(error){
        console.error("Error seeding data:", error)
    }
}

seed();