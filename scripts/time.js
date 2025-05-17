function getLocalTime() {
    const display = document.getElementById("time");
  
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate();
    const month = now.toLocaleString("en-US", { month: "short" });
  
    const formatted = `${hours}:${minutes} | ${day} ${month}`;
    display.textContent = formatted;
  }
  
  getLocalTime();
  