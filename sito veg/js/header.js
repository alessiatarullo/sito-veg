export function initializeHeader() {
    const headerContainer = document.querySelector('#header-container');
    headerContainer.innerHTML = `
        <header class="container-fluid custom-bg rounded-5 px-4 py-4">
            <div class="d-flex align-items-center gap-4">
                <a class="navbar-brand" href="index.html">
                    <img src="../img/logo.jpg" alt="Logo" style="width:150px" class="rounded-pill"> 
                </a>
                <a href="index.html" style="text-decoration: none; color: inherit;">
                    <h1 class="display-4">archivio veg</h1>
                </a>
            </div>
        </header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="about.html">chi siamo</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="recipes.html" role="button" data-bs-toggle="dropdown">
                            ricette
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-filter="all">tutte le ricette</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="primi">primi</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="secondi">secondi</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="contorni">contorni</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="dolci">dolci</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="snack">snack</a></li>
                                <li><a class="dropdown-item" href="#" data-filter="condimenti">condimenti</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <div class="position-relative w-100">
                            <input id="search-input" class="form-control pe-5" type="text" placeholder="cerca una ricetta">
                            <button id="search-button" type="button" class="btn position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent">
                                <i class="bi bi-search-heart"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    `;
}