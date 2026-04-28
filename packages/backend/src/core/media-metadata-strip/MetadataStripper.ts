/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface MetadataStripper {
	readonly mime: string;
	/**
	 * Read the file at `srcPath`, strip metadata, and write the result to `dstPath`.
	 * The caller is responsible for any post-processing such as replacing the original.
	 */
	strip(srcPath: string, dstPath: string): Promise<void>;
}
