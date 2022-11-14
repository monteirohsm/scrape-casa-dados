const nextElement = document.getElementsByClassName("pagination-next")[2];

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const links = [];

const putLinkIntoArray = () => {
  [...document.querySelectorAll(".has-text-success")].forEach((i) => {
    links.push(i.closest("a").href);
  });
  nextElement.click();
};

(async function scrapeIt(n) {
  const isResultEmpty = !!document.querySelectorAll(
    "p.has-text-weight-bold"
  )[0];

  if (isResultEmpty) {
    document
      .querySelector(
        "#__layout > div > div.top-footer > section > div:nth-child(7) > div > div > button.button.is-medium.is-success"
      )
      .click();

    await sleep(3000);
  }

  const lastPageNumber = Number(
    Array.from(document.getElementsByTagName("li")).slice(-1).pop().innerText
  );

  if (n <= lastPageNumber) {
    setTimeout(function () {
      putLinkIntoArray();
      scrapeIt(n);
    }, 1000);

    console.log(`Página ${n++}, analisando próxima página...`);
  } else {
    console.log(`Fim do script! Não há mais páginas para analisar.`);
  }
})(1);
