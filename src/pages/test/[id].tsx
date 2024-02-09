export const runtime = "experimental-edge";

export async function getStaticPaths() {
  // const res = await fetch(
  //   `http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=${3}`
  // );

  // const data: number[] = await res.json();

  // return {
  //   paths: data.map((number) => ({ params: { id: number.toString() } })),
  //   fallback: false,
  // };

  // 서버로부터 ID의 목록 받아옴

  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      // 등록된 path는 하나의 config history 인스턴스
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=${id}`
  );
  // id를 기준으로 config를 fetch하고 data를 얻어옴

  const data: number[] = await res.json();

  return { props: { data } };
}

export default function TestPage({ data }: { data: number[] }) {
  return (
    <div>
      TestPage
      <ul>
        {data.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}
