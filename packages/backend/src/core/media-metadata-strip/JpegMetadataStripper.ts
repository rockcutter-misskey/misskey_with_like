/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { bindThis } from '@/decorators.js';
import type { MetadataStripper } from './MetadataStripper.js';

@Injectable()
export class JpegMetadataStripper implements MetadataStripper {
	public readonly mime = 'image/jpeg';

	@bindThis
	public async strip(srcPath: string, dstPath: string): Promise<void> {
		await sharp(srcPath)
			.rotate()
			.keepIccProfile()
			.jpeg({ quality: 95, mozjpeg: true })
			.toFile(dstPath);
	}
}
