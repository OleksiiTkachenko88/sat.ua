<style>
  .social-right {
    width: 56px;
    height: 56px;
    position: fixed;
    right: 50px;
    bottom: 50px;
    cursor: pointer;
    z-index: 101;
  }

  .social-right::before {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(33, 33, 33, 0.3);
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: .4s;
  }

  .social-right--open::before {
    opacity: 1;
    visibility: visible;
    transition-duration: .1s;
  }

  .social-right-main-btn {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    background-color: #0072bc;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: background-color .3s;
  }

  .social-right-main-btn:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16), 0 6px 12px rgb(0, 0, 0, 0.32);
  }

  .social-right--open .social-right-main-btn {
    background-color: #d6d6d6;
  }

  .social-right-main-btn__img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50%;
    pointer-events: none;
    transition-property: opacity, transform;
    transition-duration: .4s;
  }

  .social-right--open .social-right-main-btn__img--chat {
    transform: rotate(90deg);
    opacity: 0;
  }

  .social-right-main-btn__img--close {
    opacity: 0;
  }

  .social-right--open .social-right-main-btn__img--close {
    opacity: 1;
    transform: rotate(90deg);
  }

  .social-right-links {
    list-style: none;
    padding-left: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 50%;
    height: 0;
    transform: translateX(-50%);
    overflow: hidden;
    transition-property: height, transform;
    transition-duration: .3s;
    width: 58px;
  }

  .social-right--open .social-right-links {
    height: 215px;
    transform: translateX(-50%) translateY(-165px);
  }

  .social-right-links__item {
    margin-top: 10px;
  }

  .social-right-links__item:last-child {
    margin-bottom: 15px;
  }

  .social-right-links__link {
    margin: 0 auto;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    box-shadow: 0 8px 6px -6px rgba(33, 33, 33, .2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: box-shadow .3s;
    cursor: pointer;
  }

  .social-right-links__link:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.16), 0 6px 12px rgb(0, 0, 0, 0.32);
  }

  .social-right-links__link--chat {
    background-color: #0072bc;
    padding: 11px;
    border: none;
  }

  .social-right-links__link--viber {
    background-color: #995aca;
  }

  .social-right-links__link--telegram {
    background-color: #2fc6f6;
  }

  .social-right-links__link--facebook {
    background-color: #38659f;
  }

  .social-right-links__link--faq {
    background-color: #eeaa00;
  }

  .social-right-links__link--instruction {
    background-color: #579f5a;
  }

  .b24-widget-button-wrapper {
    display: none !important;
  }
</style>

<div class="social-right" id="socialRight">
  <button title="Чат з менеджером" class="social-right-main-btn">
    <svg class="social-right-main-btn__img social-right-main-btn__img--chat" width="28" height="28" viewBox="0 0 28 29">
      <path
        fill="#FFFFFF"
        fill-rule="evenodd"
        transform="translate(-855 -962)"
        d="M878.289968,975.251189 L878.289968,964.83954 C878.289968,963.46238 876.904379,962
          875.495172,962 L857.794796,962 C856.385491,962 855,963.46238 855,964.83954 L855,975.251189
          C855,976.924031 856.385491,978.386204 857.794796,978.090729 L860.589592,978.090729 L860.589592,981.876783
          L860.589592,983.76981 L861.521191,983.76981 C861.560963,983.76981 861.809636,982.719151 862.45279,982.823297
          L866.179185,978.090729 L875.495172,978.090729 C876.904379,978.386204 878.289968,976.924031 878.289968,975.251189
          Z M881.084764,971.465135 L881.084764,976.197702 C881.43316,978.604561 879.329051,980.755508 876.426771,980.93027
          L868.042382,980.93027 L866.179185,982.823297 C866.400357,983.946455 867.522357,984.94992 868.973981,984.716324
          L876.426771,984.716324 L879.221567,988.502377 C879.844559,988.400361 880.153166,989.448891 880.153166,989.448891
          L881.084764,989.448891 L881.084764,987.555864 L881.084764,984.716324 L882.947962,984.716324 C884.517696,984.949819
          885.742758,983.697082 885.742758,981.876783 L885.742758,974.304675 C885.742659,972.717669 884.517597,971.465135
          882.947962,971.465135 L881.084764,971.465135 Z"
      />
    </svg>

    <svg class="social-right-main-btn__img social-right-main-btn__img--close" width="29" height="29" viewBox="0 0 29 29">
      <path
        fill="#FFF"
        fill-rule="evenodd"
        d="M18.866 14.45l9.58-9.582L24.03.448l-9.587 9.58L4.873.447.455 4.866l9.575
          9.587-9.583 9.57 4.418 4.42 9.58-9.577 9.58 9.58 4.42-4.42"
      />
    </svg>
  </button>

  <ul id="socialRightLinks" class="social-right-links">
    <li class="social-right-links__item">
      <button title="Онлайн-чат" class="social-right-links__link social-right-links__link--chat" id="socialRightChat">
        <svg width="31" height="28" viewBox="0 0 31 28">
          <path
            fill="#FFFFFF"
            fill-rule="evenodd"
            d="M23.29 13.25V2.84c0-1.378-1.386-2.84-2.795-2.84h-17.7C1.385 0 0 1.462 0 2.84v10.41c0 1.674 1.385
              3.136 2.795 2.84H5.59v5.68h.93c.04 0 .29-1.05.933-.947l3.726-4.732h9.315c1.41.296 2.795-1.166
              2.795-2.84zm2.795-3.785v4.733c.348 2.407-1.756 4.558-4.658 4.732h-8.385l-1.863 1.893c.22 1.123 1.342
              2.127 2.794 1.893h7.453l2.795 3.786c.623-.102.93.947.93.947h.933v-4.734h1.863c1.57.234 2.795-1.02
              2.795-2.84v-7.57c0-1.588-1.225-2.84-2.795-2.84h-1.863z"
          />
        </svg>
      </button>
    </li>

    <li class="social-right-links__item">
      <a
        title="Viber"
        class="social-right-links__link social-right-links__link--viber"
        href="viber://pa?chatURI=tksatbot"
        target="_blank"
      >
        <svg width="40" height="40" viewBox="0 0 42 42">
          <path fill="#FFF" fill-rule="nonzero" d="M32.508 15.53l-.007-.027c-.53-2.17-2.923-4.499-5.12-4.983l-.025-.006a28.14 28.14 0 0 0-10.712 0l-.025.006c-2.197.484-4.59 2.813-5.121 4.983l-.006.027a21.443 21.443 0 0 0 0 9.135l.006.026c.509 2.078 2.723 4.3 4.839 4.91v2.423c0 .877 1.056 1.308 1.657.675l2.426-2.552c.527.03 1.053.047 1.58.047 1.79 0 3.579-.171 5.356-.514l.024-.005c2.198-.485 4.59-2.814 5.121-4.984l.007-.026c.656-3.031.656-6.105 0-9.135zm-2.01 8.435c-.35 1.374-2.148 3.082-3.577 3.398-1.87.352-3.755.503-5.638.452a.134.134 0 0 0-.1.04L19.43 29.64l-1.865 1.899c-.136.14-.376.045-.376-.15v-3.895a.135.135 0 0 0-.11-.131h-.001c-1.429-.316-3.226-2.024-3.577-3.399a18.53 18.53 0 0 1 0-8.013c.351-1.374 2.148-3.082 3.577-3.398a26.437 26.437 0 0 1 9.843 0c1.43.316 3.227 2.024 3.578 3.398a18.511 18.511 0 0 1 0 8.014zm-5.676 2.065c-.225-.068-.44-.115-.64-.198-2.068-.861-3.97-1.973-5.478-3.677-.858-.968-1.529-2.062-2.096-3.22-.269-.549-.496-1.12-.727-1.686-.21-.517.1-1.05.427-1.44a3.37 3.37 0 0 1 1.128-.852c.334-.16.663-.068.906.216.527.614 1.01 1.259 1.402 1.97.24.438.175.973-.262 1.27-.106.073-.202.158-.301.24a.99.99 0 0 0-.228.24.662.662 0 0 0-.044.58c.538 1.486 1.446 2.64 2.935 3.263.238.1.477.215.751.183.46-.054.609-.56.931-.825.315-.258.717-.262 1.056-.046.34.215.668.447.995.68.321.23.64.455.936.717.285.251.383.581.223.923-.294.625-.72 1.146-1.336 1.478-.174.093-.382.124-.578.184-.225-.069.196-.06 0 0zm-2.378-11.847c2.464.075 4.488 1.86 4.922 4.517.074.452.1.915.133 1.375.014.193-.087.377-.278.38-.198.002-.286-.178-.3-.371-.025-.383-.042-.767-.09-1.146-.256-2.003-1.72-3.66-3.546-4.015-.275-.054-.556-.068-.835-.1-.176-.02-.407-.031-.446-.27a.32.32 0 0 1 .297-.37c.048-.003.096 0 .143 0 2.464.075-.047 0 0 0zm2.994 5.176c-.004.033-.006.11-.023.183-.06.265-.405.298-.484.03a.918.918 0 0 1-.028-.254c0-.558-.105-1.115-.347-1.6-.249-.5-.63-.92-1.075-1.173a2.786 2.786 0 0 0-.857-.306c-.13-.025-.26-.04-.39-.06-.157-.026-.241-.143-.234-.323.007-.169.114-.29.272-.28.52.035 1.023.165 1.485.45.94.579 1.478 1.493 1.635 2.713.007.055.018.11.022.165.009.137.014.274.023.455-.003.033-.009-.18 0 0zm-.996.397c-.275.005-.423-.144-.451-.391-.02-.173-.035-.348-.077-.516a1.447 1.447 0 0 0-.546-.84 1.436 1.436 0 0 0-.444-.21c-.202-.057-.412-.04-.613-.09-.219-.052-.34-.226-.305-.427a.394.394 0 0 1 .417-.311c1.275.09 2.186.737 2.316 2.209.01.104.02.213-.003.313a.325.325 0 0 1-.294.263c-.275.005.125-.008 0 0z"/>
        </svg>
      </a>
    </li>

    <li class="social-right-links__item">
      <a
        title="Telegram"
        class="social-right-links__link social-right-links__link--telegram"
        href="https://t.me/TKSatBot"
        target="_blank"
      >
        <svg width="40" height="40" viewBox="0 0 42 42">
          <path fill="#FFF" d="M25.616 16.036L17.8 23.269a1.61 1.61 0 0 0-.502.965l-.266 1.964c-.035.263-.405.289-.478.035l-1.024-3.582a.948.948 0 0 1 .417-1.068l9.471-5.807c.17-.104.346.125.2.26m3.793-3.997L9.52 19.677a.568.568 0 0 0 .005 1.064l4.847 1.8 1.876 6.005c.12.385.592.527.906.272l2.701-2.192a.809.809 0 0 1 .983-.028l4.872 3.522c.336.242.811.06.895-.344l3.57-17.09a.57.57 0 0 0-.765-.647"/>
        </svg>
      </a>
    </li>

  </ul>
</div>

<script>
  const socialRight = document.getElementById('socialRight');

  const onClicksocialRight = function (evt) { evt.currentTarget.classList.toggle('social-right--open') }
  socialRight.addEventListener('click', onClicksocialRight);

  const onClicksocialRightChat = function () {
    const liveChat = document.querySelector('.b24-widget-button-openline_livechat');
    if (liveChat) liveChat.click();
  }

  const socialRightChat = document.getElementById('socialRightChat');
  socialRightChat.addEventListener('click', onClicksocialRightChat);
</script>
