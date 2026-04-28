/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { bindThis } from '@/decorators.js';
import type { MetadataStripper } from './MetadataStripper.js';

@Injectable()
export class JpegMetadataStripper implements MetadataStripper {
	public readonly mime = 'image/jpeg';

	@bindThis
	public async strip(path: string): Promise<void> {
		const tmpPath = `${path}.stripped`;
		try {
			await sharp(path)
				.rotate()
				.keepIccProfile()
				.jpeg({ quality: 95, mozjpeg: true })
				.toFile(tmpPath);
			await fs.promises.rename(tmpPath, path);
		} catch (err) {
			await fs.promises.unlink(tmpPath).catch(() => {});
			throw err;
		}
	}
}
