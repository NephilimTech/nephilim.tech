const persons = [
  {
    name: "Ojas Singh",
    photo: "https://cdn.dribbble.com/users/1102933/screenshots/4147388/tiger_debuts.gif",
    title: "Founder, Developer",
    bio:
      "<p></p>",
    social: {
      facebook: "https://www.facebook.com/ojas.ae",
      twitter: "https://twitter.com/ezAF_Healer",
      linkedin: "#"
    }
  },
  {
    name: "Abhijit Pati",
    photo: "https://cdn.dribbble.com/users/1227167/screenshots/4035247/alien_dance2.gif",
    title: "Marketing advisor, strategist ",
    bio:
      "<p></p>",
    social: {
      facebook: "#",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Aaditya Mishra",
    photo: "https://cdn.dribbble.com/users/787686/screenshots/3652856/momo_meditating_dribbble.gif",
    title: "UI Designer,Web Developer",
    bio:
      "<p></p>",
    social: {
      facebook: "https://www.facebook.com/aaditya.mishra.18",
      twitter: "#",
      linkedin: "#"
    }
  },
  {
    name: "Abhishek Purohit",
    photo: "https://cdn.dribbble.com/users/1154103/screenshots/5278414/magic_fox.gif",
    title: "operations & financial strategist",
    bio:
      "<p></p>",
    social: {
      facebook: "https://www.facebook.com/abhishek.purohit.942",
      twitter: "#",
      linkedin: "#"
    }
  }
];

const app = new Vue({
  el: "#app",
  data() {
    return {
      persons: persons,
      selectedPersonIndex: null,
      isSelected: false,
      selectedPerson: null,
      inlineStyles: null,
      isReady: false,
      isOk: false,
      selectedPersonData: {
        name: null,
        title: null,
        photo: null,
        social: {
          facebook: null,
          twitter: null,
          linkedin: null
        }
      }
    };
  },
  methods: {
    selectPerson(index, el) {
      if (!this.isOk) {
        this.selectedPersonIndex = index;
        this.isSelected = true;
        el.target.parentElement.className == "person-details"
          ? (this.selectedPerson = el.target.parentElement.parentElement)
          : (this.selectedPerson = el.target.parentElement);

        this.selectedPerson.classList.add("person-selected");
        this.selectedPerson.setAttribute(
          "style",
          `width:${this.selectedPerson.offsetWidth}px;`
        );
        this.selectedPersonData = this.persons[index];
        window.setTimeout(() => {
          this.inlineStyles = `width:${this.selectedPerson
            .offsetWidth}px;height:${this.selectedPerson
            .offsetHeight}px;left:${this.selectedPerson.offsetLeft}px;top:${this
            .selectedPerson.offsetTop}px;position:fixed`;
          this.selectedPerson.setAttribute("style", this.inlineStyles);
        }, 400);
        window.setTimeout(() => {
          this.isReady = true;
          this.isOk = true;
        }, 420);
      } else {
        this.reset();
      }
    },
    reset() {
      this.isReady = false;
      window.setTimeout(() => {
        this.selectedPerson.classList.add("person-back");
      }, 280);
      window.setTimeout(() => {
        this.selectedPerson.setAttribute("style", "");
      }, 340);
      window.setTimeout(() => {
        this.isSelected = false;
        this.selectedPerson.classList.remove("person-back", "person-selected");
        this.isOk = false;
      }, 400);
    }
  }
});
