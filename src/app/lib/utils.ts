"use server";
//Funciones y utilidades para usar en el proyecto

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getURL() {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: "test-file",
  });

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    signingRegion: process.env.AWS_BUCKET_REGION,
    expiresIn: 60,
  });
  return { success: { url: signedURL.split("?")[0] } };
}
