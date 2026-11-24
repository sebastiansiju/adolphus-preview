import './site.css';
import './reference-design.css';
import './site-polish.css';
export const metadata = { title: 'Adolphus Group | The art of finding exceptional people', description: 'Specialist recruitment in London. Permanent, interim and temporary talent.' };

const fonts = ['cormorant-garamond-600', 'inter-400'];

export default function Layout({children}: {children: React.ReactNode}) {
  return <html lang="en"><head>{fonts.map(font =>
    <link key={font} rel="preload" href={'/fonts/' + font + '.ttf'} as="font" type="font/ttf" crossOrigin="anonymous"/>
  )}</head><body>{children}</body></html>;
}
