import users from './gita-4.json' assert {type: 'json'};

let chapter = 1;
let verse = 1;
let verse_number = chapter + '.' + verse;
let chapter_length = Object.keys(users[chapter]).length;

let can_click = true;

let is_vertical = true;

let page_state = 0;

const title_box = document.getElementById("title-box");
const chapter_box = document.getElementById("chapter-box");
const verse_box = document.getElementById("verse-box");

change_chapter(chapter);
change_verse(chapter, verse);

function transition_background(){
    document.body.classList.add('fade');
    setTimeout(function() {
        document.body.classList.add('show');
      }, 250);
    
    setTimeout(function() {
        document.documentElement.style.setProperty("--og-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
        document.body.classList.remove('show');
    }, 500);
}

function change_chapter(chapter){
    document.getElementById("chapter-number").innerHTML = chapter;
    document.getElementById("chapter-eng").innerHTML = users[chapter]['name_eng'];
    document.getElementById("chapter-san").innerHTML = users[chapter]['name_san'];
    chapter_length = Object.keys(users[chapter]).length;
}

function change_verse(chapter, verse){
    verse_number = chapter + '.' + verse;

    document.getElementById("verse_eng").innerHTML = users[chapter][verse]['eng'];
    document.getElementById("verse_san").innerHTML = users[chapter][verse]['san'];
    document.getElementById("verse_number").innerHTML = verse_number;
}

function change_scene(scene_1, scene_2){
    let scene_1_element = document.getElementById(scene_1);
    let scene_2_element = document.getElementById(scene_2);

    transition_fade(scene_1, '0rem', '0rem', 1, 0, is_vertical, '');

    setTimeout(function() {scene_1_element.style.display = 'none'}, 250);

    setTimeout(function() {
        if (scene_2 == 'verse-box'){
            change_verse(chapter, verse)
        }
        else if (scene_2 == 'chapter-box'){
            change_chapter(chapter);
        }

        scene_2_element.style.display = 'inline';
        transition_fade(scene_2, '0rem', '0rem', 0, 1, is_vertical, '');
    }, 250);
}

function transition_fade(element_name, start_pos, end_pos, start_opa, end_opa, is_vertical, move_direction){
    const element = document.getElementById(element_name);

    element.style.opacity = end_opa;

    if (is_vertical){
        document.documentElement.style.setProperty("--trans-pos-verti-start", move_direction + start_pos);
        document.documentElement.style.setProperty("--trans-pos-verti-end", move_direction + end_pos);
    
        document.documentElement.style.setProperty("--trans-pos-hori-start", 0);
        document.documentElement.style.setProperty("--trans-pos-hori-end", 0);
    }

    else{
        document.documentElement.style.setProperty("--trans-pos-verti-start", 0);
        document.documentElement.style.setProperty("--trans-pos-verti-end", 0);
    
        document.documentElement.style.setProperty("--trans-pos-hori-start", move_direction + start_pos);
        document.documentElement.style.setProperty("--trans-pos-hori-end", move_direction + end_pos);
    }

    document.documentElement.style.setProperty("--trans-opa-start", start_opa);
    document.documentElement.style.setProperty("--trans-opa-end", end_opa);

    element.classList.add("trans");

    setTimeout(function() {element.classList.remove("trans");}, 225);
}

/*
const styles = getComputedStyle(document.documentElement);
const primaryColor = styles.getPropertyValue("--accent-color");
console.log(primaryColor);
*/

document.addEventListener('keydown', event => {
    switch (page_state){
        // Title Screen
        case 0:
            if (event.key != 'Escape'){
                can_click = false
                page_state += 1

                change_scene("title-box", "chapter-box");

                setTimeout(function() {
                    can_click = true;
                }, 500);
            }
            break;
        
        // Chapter Select
        case 1:
            if ((event.key === 'ArrowDown' || event.key === 's' || event.key === 'ArrowRight' || event.key === 'd') && chapter < 18 && can_click == true){
                // Rotate Chapters
                can_click = false;

                //document.documentElement.style.setProperty("--og-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                chapter += 1;

                if (event.key === 'ArrowDown' || event.key === 's'){
                    is_vertical = true;}
                else{
                    is_vertical = false;}

                transition_background();
                transition_fade('chapter-box', '0rem', '10rem', 1, 0, is_vertical, '-');
        
                setTimeout(function() { 
                    document.documentElement.style.setProperty("--changed-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                    change_chapter(chapter);
                    transition_fade('chapter-box', '10rem', '0rem', 0, 1, is_vertical, '');
                }, 250);             

                setTimeout(function() {can_click = true;}, 500);
            }

            else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ArrowLeft' || event.key === 'a') && chapter > 1 && can_click == true){
                // Rotate Chapters
                can_click = false;
                
                //document.documentElement.style.setProperty("--og-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                chapter -= 1;

                if (event.key === 'ArrowUp' || event.key === 'w'){
                    is_vertical = true;}
                else{
                    is_vertical = false;}

                transition_background();
                transition_fade('chapter-box', '0rem', '10rem', 1, 0, is_vertical, '');
        
                setTimeout(function() { 
                    document.documentElement.style.setProperty("--changed-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                    change_chapter(chapter);
                    transition_fade('chapter-box', '10rem', '0rem', 0, 1, is_vertical, '-');
                }, 250);
        
                setTimeout(function() {can_click = true;}, 500);
            }

            else if ((event.code === 'Space' || event.key === 'Enter') && can_click == true){
                // change scene from chapter to verse
                can_click = false

                change_scene("chapter-box", "verse-box");

                setTimeout(function() {
                    page_state += 1
                    can_click = true;
                }, 500);
            }

            else if (event.key === 'Escape' && can_click == true){
                // change scene from chapter to title
                can_click = false;

                change_scene('chapter-box', 'title-box')

                setTimeout(function() {
                    page_state -= 1
                    can_click = true;
                }, 500);
            }
            break;
        
        default:
            if ((event.code === 'Space' || event.key === 'Enter' || event.key === 'ArrowDown' || event.key === 'd' || event.key === 'ArrowRight' || event.key === 's') && verse < chapter_length - 2 && can_click == true) {
                can_click = false;

                if (event.shiftKey){
                    if (verse < chapter_length - 12){verse += 10;} 
                    else{verse = chapter_length - 2;}}
                else{
                    verse += 1;}

                if (event.key === 'ArrowRight' || event.key === 'd'){
                    is_vertical = false;}
                else{
                    is_vertical = true;}

                transition_fade('verse-box', '0rem', '10rem', 1, 0, is_vertical, '-');
        
                setTimeout(function() { 
                    change_verse(chapter, verse);
                    transition_fade('verse-box', '10rem', '0rem', 0, 1, is_vertical, '');
                }, 250);
        
                setTimeout(function() {can_click = true;}, 500);
            }
        
            else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ArrowLeft' || event.key === 'a') && verse > 1 && can_click == true) {
                can_click = false;

                if (event.shiftKey){
                    if (verse > 10){verse -= 10;} 
                    else{verse = 1;}}
                else{
                    verse -= 1;}

                if (event.key === 'ArrowUp' || event.key === 'w'){
                    is_vertical = true;}
                else{
                    is_vertical = false;}
        
                transition_fade('verse-box', '0rem', '10rem', 1, 0, is_vertical, '');
        
                setTimeout(function() { 
                    change_verse(chapter, verse);
                    transition_fade('verse-box', '10rem', '0rem', 0, 1, is_vertical, '-');
                }, 250);
        
                setTimeout(function() {can_click = true;}, 500);
            }

            else if (event.key === 'Escape' && can_click == true){
                // change scene from verse to chapter
                can_click = false;
                verse = 1;
                
                change_scene('verse-box', 'chapter-box')

                setTimeout(function() {
                    page_state -= 1
                    can_click = true;
                }, 500);
            }

            else if ((event.code === 'Space' || event.key === 'Enter' || event.key === 'ArrowDown' || event.key === 'd' || event.key === 'ArrowRight' || event.key === 's') && verse == chapter_length - 2 && can_click == true) {
                // change scene from verse to chapter
                can_click = false;
                verse = 1;
                chapter += 1;
                
                change_scene('verse-box', 'chapter-box')

                transition_background();
                transition_fade('chapter-box', '0rem', '0rem', 1, 0, is_vertical, '');
        
                setTimeout(function() { 
                    document.documentElement.style.setProperty("--changed-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                    change_chapter(chapter);
                    transition_fade('chapter-box', '0rem', '0rem', 0, 1, is_vertical, '');
                }, 250);    

                setTimeout(function() {
                    page_state -= 1
                    can_click = true;
                }, 500);
            }

            else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ArrowLeft' || event.key === 'a') && verse == 1 && can_click == true) {
                // change scene from verse to chapter
                can_click = false;
                verse = 1;
                
                change_scene('verse-box', 'chapter-box')

                setTimeout(function() {
                    page_state -= 1
                    can_click = true;
                }, 500);
            }
    }
});


document.addEventListener('click', event => {
    console.log('this is a click')

    switch (page_state){
        // Title Screen
        case 0:
            can_click = false
            page_state += 1

            change_scene("title-box", "chapter-box");

            setTimeout(function() {
                can_click = true;
            }, 500);
            break;
        
        // Chapter Select
        case 1:
            if (can_click){
                // change scene from chapter to verse
                can_click = false

                change_scene("chapter-box", "verse-box");

                setTimeout(function() {
                    page_state += 1
                    can_click = true;
                }, 500);
            }

            break;
        
        default:
            if (can_click && verse < chapter_length - 2) {
                can_click = false;

                if (event.shiftKey){
                    if (verse < chapter_length - 12){verse += 10;} 
                    else{verse = chapter_length - 2;}}
                else{
                    verse += 1;}

                is_vertical = true;

                transition_fade('verse-box', '0rem', '10rem', 1, 0, is_vertical, '-');
        
                setTimeout(function() { 
                    change_verse(chapter, verse);
                    transition_fade('verse-box', '10rem', '0rem', 0, 1, is_vertical, '');
                }, 250);
        
                setTimeout(function() {can_click = true;}, 500);
            }

            else if (verse == chapter_length - 2 && can_click) {
                // change scene from verse to chapter
                can_click = false;
                verse = 1;
                chapter += 1;
                
                change_scene('verse-box', 'chapter-box')

                transition_background();
                transition_fade('chapter-box', '0rem', '0rem', 1, 0, is_vertical, '');
        
                setTimeout(function() { 
                    document.documentElement.style.setProperty("--changed-image", `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('site-images/gita-img-${chapter}.jpeg')`);
                    change_chapter(chapter);
                    transition_fade('chapter-box', '0rem', '0rem', 0, 1, is_vertical, '');
                }, 250);    

                setTimeout(function() {
                    page_state -= 1
                    can_click = true;
                }, 500);
            }
    }
});