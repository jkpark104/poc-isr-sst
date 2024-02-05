export async function getStaticProps() {
  const res = await fetch(
    "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=$5"
  );

  const data: number[] = await res.json();

  return { props: { data } };
}

export default function TestPage({ data }: { data: number[] }) {
  return (
    <div>
      TestPage root
      <ul>
        {data.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </div>
  );
}
