import { AdvertisementAnchor } from "./Advertisement.styles";

function Advertisement() {
  return (
    <AdvertisementAnchor href="https://www.wanted.co.kr/">
      <img
        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
        alt="Advertisement"
      />
    </AdvertisementAnchor>
  );
}

export default Advertisement;
