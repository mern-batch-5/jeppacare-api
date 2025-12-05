const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function uploadToS3(file) {
    const key = `medical-records/${Date.now()}_${file.originalname}`;

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Body: file.buffer, // use buffer for memory storage
        ContentType: file.mimetype,
        ACL: "public-read", // optional: public access
    };

    await s3.send(new PutObjectCommand(uploadParams));

    return `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

module.exports = uploadToS3;
