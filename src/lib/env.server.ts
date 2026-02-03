import { createEnv } from '@t3-oss/env-core';
import { vercel } from '@t3-oss/env-core/presets-zod';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GITHUB_TOKEN: z.string()
	},
	emptyStringAsUndefined: true,
	runtimeEnv: process.env,
	extends: [vercel()]
});
