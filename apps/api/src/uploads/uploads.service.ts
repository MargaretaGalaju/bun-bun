import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadsService {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;
  private readonly presignExpiresSec: number;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.getOrThrow<string>('R2_BUCKET');
    this.publicBaseUrl = this.config.getOrThrow<string>('R2_PUBLIC_BASE_URL');
    this.presignExpiresSec = parseInt(
      this.config.get<string>('R2_PRESIGN_EXPIRES_SECONDS') || '600',
      10,
    );

    this.s3 = new S3Client({
      endpoint: this.config.getOrThrow<string>('R2_ENDPOINT'),
      region: this.config.get<string>('R2_REGION') || 'auto',
      credentials: {
        accessKeyId: this.config.getOrThrow<string>('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow<string>('R2_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async presignPut(key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    return getSignedUrl(this.s3, command, {
      expiresIn: this.presignExpiresSec,
    });
  }

  getPublicUrl(key: string): string {
    return `${this.publicBaseUrl}/${key}`;
  }
}
