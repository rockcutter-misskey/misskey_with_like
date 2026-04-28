/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import * as fileType from 'file-type';
import Logger from '@/logger.js';
import { bindThis } from '@/decorators.js';
import { JpegMetadataStripper } from './JpegMetadataStripper.js';
import type { MetadataStripper } from './MetadataStripper.js';

@Injectable()
export class MediaMetadataStripService {
	private readonly logger: Logger;
	private readonly strippers: Map<string, MetadataStripper>;

	constructor(
		private jpegMetadataStripper: JpegMetadataStripper,
	) {
		this.logger = new Logger('media-metadata-strip', 'gray');
		this.strippers = new Map<string, MetadataStripper>([
			[jpegMetadataStripper.mime, jpegMetadataStripper],
		]);
	}

	@bindThis
	public async strip(path: string): Promise<void> {
		const dstPath = `${path}.stripped`;
		try {
			const type = await fileType.fileTypeFromFile(path);
			if (!type) return;
			const stripper = this.strippers.get(type.mime);
			if (!stripper) return;
			await stripper.strip(path, dstPath);
			await fs.promises.rename(dstPath, path);
		} catch (err) {
			await fs.promises.unlink(dstPath).catch(() => {});
			this.logger.warn(`metadata strip failed, continuing with original: ${err}`);
		}
	}
}
