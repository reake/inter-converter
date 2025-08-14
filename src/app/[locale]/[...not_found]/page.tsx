import NotFound from "@/components/blocks/not-found";



// Cloudflare Pages Edge Runtime 配置
export const runtime = 'edge';
export default function NotFoundCatchAll() {
  return <NotFound />;
}