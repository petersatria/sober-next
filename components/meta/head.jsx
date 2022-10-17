import Head from "next/head";

export default function Meta(props) {
  return (
    <div>
      <Head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </Head>
      <div>{props.children}</div>
    </div>
  );
}
