<style lang="scss">
  aside {
    padding: 10px;

    p {
      width: 100%;
      margin: 25px 0px;

      a {
        text-decoration: none;

        span {
          display: inline-block;
          transition: all 0.3s ease-in-out;
        }

        .nav-icon {
          margin-right: 5px;
        }

        &:hover span {
          transform: translateX(10px);
        }
      }
    }
  }
</style>

<aside>
  <p>
    <a href="/wallets">
      <i class="fa-solid fa-wallet nav-icon"></i>
      <span>Wallets</span>
    </a>
  </p>
  <p>
    <a href="/statistics">
      <i class="fa-solid fa-chart-column nav-icon"></i>
      <span>Statistics</span>
    </a>
  </p>
  <p>
    <a href="/history">
      <i class="fa-regular fa-clock nav-icon"></i>
      <span>History</span>
    </a>
  </p>
  <p>
    <a href="/dapps">
      <i class="fa-solid fa-mobile-screen-button nav-icon"></i>
      <span>Dapps</span>
    </a>
  </p>
</aside>
