import "../App.css";

function MenuBar(){
    return(
        <header className="MenuBar" >
            <div class="MenuIcon">
                <a href="#">Test</a>
            </div>
            <ul class="MenuItem">
                <li><a href="#">Home</a></li>
                <li><a href="#">Promotion</a></li>
                <li><a href="#">Help</a></li>
            </ul>
        </header>
    );
}

export default MenuBar;