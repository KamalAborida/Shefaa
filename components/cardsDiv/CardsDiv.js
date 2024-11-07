import Card from "../general/Card";

export default function CardsDiv({
  sectionTitle,
  isAdmin,
  data,
  isNavLinkActive,
}) {
  return (
    <section className="cardsDiv">
      <h1 className="cardsDiv__heading">{sectionTitle}</h1>
      {data &&
        data.map((elem) => {
          // console.log("HI,", elem.img);
          return (
            <Card
              duration={elem.duration}
              description={elem.description}
              price={elem.price}
              heading={elem.name}
              img={`https://shefaa-demo.s3.amazonaws.com/${elem.img}`}
              isAdmin={isAdmin}
              key={elem.id}
              serviceID={elem.id}
              isNavLinkActive={isNavLinkActive}
            />
          );
        })}
    </section>
  );
}
