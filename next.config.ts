import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
 
const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname), // la root del progetto Next.js è QUESTA cartella
  },
  reactCompiler: true,
};

 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);