/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { MenuItem } from '@/types/menu.js';
import * as os from '@/os.js';
import { i18n } from '@/i18n.js';
import { $i } from '@/i.js';
import { misskeyApi } from '@/utility/misskey-api.js';

export function getImportEmojiMenuItem(reaction: string): MenuItem[] {
	if (!(reaction.startsWith(':') && /@\w/.test(reaction))) return [];
	if ($i == null || !($i.isAdmin || $i.policies.canManageCustomEmojis)) return [];

	return [{
		text: i18n.ts.import,
		icon: 'ti ti-plus',
		action: async () => {
			const [name, host] = reaction.replaceAll(':', '').split('@');
			const emojis = await misskeyApi('admin/emoji/list-remote', {
				query: name,
				host,
				limit: 100,
			});
			const emoji = emojis.find((e) => e.name === name);

			if (emoji == null) {
				os.alert({ type: 'error', text: i18n.ts.notFound });
				return;
			}

			os.apiWithDialog('admin/emoji/copy', {
				emojiId: emoji.id,
			});
		},
	}];
}
