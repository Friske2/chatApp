const esbuild = require('esbuild');
const dotenv = require('dotenv');

// Load .env.prod
const envConfig = dotenv.config({ path: '.env.prod' }).parsed;

const define = {};

if (envConfig) {
    console.log('Loading .env.prod...');
    for (const k in envConfig) {
        define[`process.env.${k}`] = JSON.stringify(envConfig[k]);
    }
} else {
    console.warn('Warning: .env.prod not found, proceeding without environment variables baked in.');
}

esbuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/bundle.js',
    define: define,
}).then(() => {
    console.log('Build complete.');
}).catch(() => process.exit(1));
