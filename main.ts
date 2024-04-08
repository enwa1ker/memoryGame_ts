interface HTMLCardElement extends HTMLElement {
    src: string;
}

const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll(".card");

let matched: number = 0;
let cardOne: HTMLDivElement | null = null;
let cardTwo: HTMLDivElement | null = null;
let disableDeck: boolean = false;

function flipCard(event: MouseEvent): void {
    const clickedCard = event.target as HTMLDivElement;
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            cardOne = clickedCard;
            return;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        const cardOneImg: string = (cardOne.querySelector(".back-view img") as HTMLCardElement).src;
        const cardTwoImg: string = (cardTwo.querySelector(".back-view img") as HTMLCardElement).src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1: string, img2: string): void {
    if (img1 === img2) {
        matched++;
        if (matched === 8) {
            setTimeout(() => {
                shuffleCard();
            }, 1000);
        }
        cardOne!.removeEventListener("click", flipCard);
        cardTwo!.removeEventListener("click", flipCard);
        cardOne = null;
        cardTwo = null;
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne!.classList.add("shake");
            cardTwo!.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne!.classList.remove("shake", "flip");
            cardTwo!.classList.remove("shake", "flip");
            cardOne = null;
            cardTwo = null;
            disableDeck = false;
        }, 1200);
    }
}

function shuffleCard(): void {
    matched = 0;
    disableDeck = false;
    cardOne = null;
    cardTwo = null;
    const arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card: HTMLDivElement, i: number) => {
        card.classList.remove("flip");
        const imgTag = card.querySelector(".back-view img") as HTMLCardElement;
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach((card: HTMLDivElement) => {
    card.addEventListener("click", flipCard);
});
