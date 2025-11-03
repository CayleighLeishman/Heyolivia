import React, { useState } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import "./ChatBox.css";

// --- Images ---
import DuckImage from "../../img/aDuckIFoundAtMySpecialist.jpg";
import RandomAnimal from "../../img/randomAnimal.jpg";
import RandomAnimalFlower from "../../img/randomAnimalButWithFlower.jpg";
import BeforeHaircut from "../../img/beforeHaircut.jpg";
import ClosetCoutour from "../../img/ClosetCoutourIdeaWithYou.jpg";
import GoToTemple from "../../img/goToTheTemple.jpg";
import Temple from "../../img/temple.jpg";
import TempleRain from "../../img/templeInRain.jpg";
import HavingFun from "../../img/HavingFun.jpg";
import MeAlsoCute from "../../img/meAlsoBeingCute.jpg";
import MeAtStudio from "../../img/meAtMyStudio.jpg";
import MeBeingCute from "../../img/meBeingCute.jpg";
import RandomBarbie from "../../img/RandomBarbiePhone.jpg";
import RandomPicMe from "../../img/randompicofme.jpg";
import SeeNewAngles from "../../img/seeNewAngles.jpg";
import TiredButCute from "../../img/TiredButCute.jpg";
import WeirdLooks from "../../img/whenIGotWeirdLooksAndDidntKnowWhy.jpg";

// --- Responses ---
const missYouResponses = [
  "Aww… I miss you too! 💛",
  "I was just thinking about you — I miss you! 😘",
  "Miss you more! Can’t wait to see you again.",
  "I miss you! Want to tell me something silly that happened today?"
];

const comfortingMessages = [
  "Ugh, that totally sucks… but hey, you tried, and that counts for something, right? 🍫",
  "Whoa… take a breath, maybe a tiny dance move? What’s the weirdest dance move you can do?",
  "You’re doing better than you think. Imagine you’re a penguin sliding across ice — slow, wobbly, but moving forward!",
  "It’s okay to feel off today. Wanna tell me the weirdest thing that happened to you this week?",
  "Sometimes life is just a giant puddle of socks… and that’s okay. What’s your favorite sock color? 🧦"
];

const funnyMessages = [
  "Did you know penguins propose with rocks? Just saying. 🐧",
  "I once tried to teach my cat to code… it didn’t go well.",
  "If life gives you lemons, ask it for chocolate instead. 🍫",
  "Imagine us riding unicorns through space… don’t forget helmets!",
  "Random thought: socks are basically portable blankets for your feet."
];

// --- Picture Library ---
const pictureMessages = [
  { src: DuckImage, categories: ["animal"] },
  { src: RandomAnimal, categories: ["animal"] },
  { src: RandomAnimalFlower, categories: ["animal"] },
  { src: BeforeHaircut, categories: ["haircut"] },
  { src: ClosetCoutour, categories: ["fun", "fashion"] },
  { src: GoToTemple, categories: ["temple"] },
  { src: Temple, categories: ["temple"] },
  { src: TempleRain, categories: ["temple"] },
  { src: HavingFun, categories: ["fun"] },
  { src: MeAlsoCute, categories: ["you"] },
  { src: MeAtStudio, categories: ["you"] },
  { src: MeBeingCute, categories: ["you"] },
  { src: RandomBarbie, categories: ["fun"] },
  { src: RandomPicMe, categories: ["you"] },
  { src: SeeNewAngles, categories: ["fun"] },
  { src: TiredButCute, categories: ["you"] },
  { src: WeirdLooks, categories: ["you"] }
];

// --- Response generator ---
const getResponse = (input) => {
  const lower = input.toLowerCase();

  // --- Pictures ---
  if (lower.includes("picture") || lower.includes("pic")) {
    let filteredPics = pictureMessages;

    if (lower.includes("animal")) filteredPics = pictureMessages.filter(pic => pic.categories.includes("animal"));
    else if (lower.includes("temple")) filteredPics = pictureMessages.filter(pic => pic.categories.includes("temple"));
    else if (lower.includes("fun")) filteredPics = pictureMessages.filter(pic => pic.categories.includes("fun"));
    else if (lower.includes("me")) filteredPics = pictureMessages.filter(pic => pic.categories.includes("you"));

    const numberMatch = lower.match(/(\d+)/);
    const count = numberMatch ? parseInt(numberMatch[0]) : 1;

    const selectedPics = [];
    for (let i = 0; i < count; i++) {
      if (!filteredPics.length) break;
      const rand = Math.floor(Math.random() * filteredPics.length);
      selectedPics.push(filteredPics[rand].src);
    }

    return selectedPics.map(src => ({ text: src, type: "image", sender: "bot" }));
  }

  // --- Miss you ---
  if (lower.includes("miss you")) {
    return { text: missYouResponses[Math.floor(Math.random() * missYouResponses.length)], type: "text", sender: "bot" };
  }

  // --- Comfort ---
  if (lower.includes("comfort")) {
    return { text: comfortingMessages[Math.floor(Math.random() * comfortingMessages.length)], type: "text", sender: "bot" };
  }

  // --- Default funny response ---
  return { text: funnyMessages[Math.floor(Math.random() * funnyMessages.length)], type: "text", sender: "bot" };
};

// --- ChatBox component ---
export default function ChatBox() {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    setChat(prev => [...prev, { text: input, type: "text", sender: "her" }]);

    const response = getResponse(input);
    if (Array.isArray(response)) {
      setChat(prev => [...prev, ...response]);
    } else {
      setChat(prev => [...prev, response]);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat">
        {chat.map((msg, i) => (
          <MessageBubble key={i} text={msg.text} type={msg.type} sender={msg.sender} />
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
