import {
    S3Client,
    ListBucketsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    PutObjectCommand,
    ListObjectsV2CommandOutput,
    ListBucketsCommandOutput,
    PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import path from "path";
import { promises as fsPromises } from 'fs';


export class R2Storage {
    private ACCOUNT_ID: string;
    private ACCESS_KEY_ID: string;
    private SECRET_ACCESS_KEY: string;
    private s3: S3Client;

    constructor(ACCOUNT_ID: string, ACCESS_KEY_ID: string, SECRET_ACCESS_KEY: string) {
        this.ACCOUNT_ID = ACCOUNT_ID
        this.ACCESS_KEY_ID = ACCESS_KEY_ID
        this.SECRET_ACCESS_KEY = SECRET_ACCESS_KEY

        this.s3 = new S3Client({
            region: "auto",
            endpoint: `https://${this.ACCOUNT_ID}.r2.cloudflarestorage.com`,
            credentials: {
                accessKeyId: this.ACCESS_KEY_ID,
                secretAccessKey: this.SECRET_ACCESS_KEY,
            },
        })
    }

    public listBuckets = async (): Promise<ListBucketsCommandOutput> => {
        const command = new ListBucketsCommand({});
        const response = await this.s3.send(command);
        return response as ListBucketsCommandOutput;
    }

    public listObjects = async (bucket: string): Promise<ListObjectsV2CommandOutput> => {
        const command = new ListObjectsV2Command({
            Bucket: bucket
        });
        const response = await this.s3.send(command);
        return response as ListObjectsV2CommandOutput;
    }

    public getObject = async (bucket: string, key: string): Promise<GetObjectCommand> => {
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: key
        });
        const response = await this.s3.send(command);
        return response as unknown as GetObjectCommand;
    }

    public uploadObject = async (bucket: string, key: string, body: string): Promise<PutObjectCommand> => {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: body
        });
        const response = await this.s3.send(command);
        return response as unknown as PutObjectCommand;
    }

    /**
     * 
     * @param bucket name of the bucket
     * @param directory local directory to upload
     * @returns  PutObjectCommandOutput | Error
     */
    public uploadDirectory = async (bucket: string, directory: string): Promise<PutObjectCommandOutput | Error> => {
        try {
            const files = await fsPromises.readdir(directory);

            for (const file of files) {
                const filePath = path.join(directory, file);
                const stat = await fsPromises.stat(filePath);

                if (stat.isFile()) {
                    const fileContents = await fsPromises.readFile(filePath);
                    const command = new PutObjectCommand({
                        Bucket: bucket,
                        Key: file,
                        Body: fileContents
                    });
                    const response = await this.s3.send(command);
                    return response as PutObjectCommandOutput;
                }
            }

            throw new Error('No files found in the directory.');
        } catch (err) {
            return new Error(err as string);
        }
    }





}