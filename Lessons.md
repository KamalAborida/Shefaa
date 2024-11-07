# Fonts

- First we need to declare them (No need toinstall anything)
- Just add the wights you want (From google fonts site)
- Add the ["latin]
  - That helps to download faster

```
import { Noto_Sans, Roboto_Flex } from "next/font/google";

const noto_Sans = Noto_Sans({
  weight: ["500", "700"],
  variable: "--noto_sans",
  subsets: ["latin"],
});
const roboto_Flex = Roboto_Flex({
  weight: ["100", "300", "400", "600"],
  variable: "--roboto_flex",
  subsets: ["latin"],
});

```

- Then apply those fonts to the html tag (.variable not .classname)

```
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${noto_Sans.variable} ${roboto_Flex.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

---

# Videos

- Videos dont get exported regularly like images
- You should first add your video to the public folder, Then export it
- When exporting something from public, you use it directly as if it's in the same folder

```
<video width="100%" height="360px" autoPlay>
  <source src="/vid.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

---

# modals

- They don't work like react
- First you create a regular modal (nav/navModal.js)
- We will use search query to activate/di-activate that modal

```
"use client";

export default function NavModal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("navModal");
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <div className="navModal">
          <Link href={pathname}>
            <li className="navModal__list__li">Home</li>
          </Link>
          <Link href={"/Login"}>
            <li className="navModal__list__li">Login</li>
          </Link>
        </div>
      )}
    </>
  );
}

```

- In the link that should open the modal it should have href="?searchQueryName=true"
  `<Link href={"?navModal=true"}><Image src={hamburger} alt="ham" /></Link>`

---

# Uploading to AWS S3 with next.js

- S3 code should be in a "use server side"

```
  const s3 = new S3({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

    s3.putObject({
    Bucket: "shefaa-demo",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: service.get("img").type,
  });
```

- .env.local won't work unless it's a "use server" file
- The region is found on the bucket page
- Server files don't accept files OR buffered images
  - Only regular objects

---

# framer-motion

- doesn't work in server components