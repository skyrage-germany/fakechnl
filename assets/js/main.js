const channelCardTemplate = document.querySelector("[data-channel-template]");
const channelCardContainer = document.querySelector("[data-item-container]");
const searchBar = document.querySelector("[search-bar]"); // Assuming searchBar is an input element

fetch("assets/json/channels.json")
  .then(res => res.json())
  .then(data => {
    const channels = data.map(channel => {
      const card = channelCardTemplate.content.cloneNode(true).children[0];
      const channelNumber = card.querySelector("[channel-number]");
      const name = card.querySelector("[channel-name]");
      const icon = card.querySelector("[channel-icon]");
      const groupIcon = card.querySelector("[group-icon]");
      const link = card.querySelector("[button-link]");
      channelNumber.textContent = channel.channel_number;
      name.textContent = channel.name;
      icon.setAttribute("src", "assets/img/channelicons/" + channel.icon + ".png");
      groupIcon.setAttribute("src", "assets/svg/group/" + channel.group_icon + ".svg");
      link.setAttribute("href", channel.link);
      channelCardContainer.append(card);

      // Add the channel object to a new array for easier filtering
      return { channelNumber: channel.channel_number, name: channel.name, element: card };
    });

    // Filter function to update displayed channels based on search term
    function filterChannels(searchTerm) {
      const filteredChannels = channels.filter(channel => {
        const searchTextLower = searchTerm.toLowerCase();
        return (
          channel.channelNumber.toString().toLowerCase().includes(searchTextLower) ||
          channel.name.toLowerCase().includes(searchTextLower)
        );
      });

      // Clear the container and re-render filtered channels
      channelCardContainer.innerHTML = "";
      filteredChannels.forEach(channel => channelCardContainer.append(channel.element));
    }

    // Attach event listener to searchBar for real-time filtering
    searchBar.addEventListener("keyup", (event) => {
      const searchTerm = event.target.value;
      filterChannels(searchTerm);
    });
  });
