import Filesaver from 'file-saver';
import { surpriseMePrompts } from "../constants";
export function getRandomPrompt(prompt){
    const randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPromt = surpriseMePrompts[randomIndex];
    if(randomPromt === prompt) return getRandomPrompt(prompt);
    return randomPromt;
}
export async function downloadImage(_id, photo) {
    Filesaver.saveAs(photo, `download-${_id}.jpg`);
    
}