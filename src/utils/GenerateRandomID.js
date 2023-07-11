const randomStr = 'BaKaPQsLMnBIjShUvViolaFlorentyaNkBbAaCkCekoJlxmVaIaTlE';

const GenerateRandomID = () => {
   let resultID = [];

   for(let i = 0; i < 7; i++) {
      resultID.push(randomStr[Math.floor(Math.random() * randomStr.length)]);
   }

   return resultID.join("");
}

export default GenerateRandomID;