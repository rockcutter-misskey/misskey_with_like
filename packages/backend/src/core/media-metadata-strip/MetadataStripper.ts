/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface MetadataStripper {
	readonly mime: string;
	strip(path: string): Promise<void>;
}
