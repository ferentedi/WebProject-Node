const returnCarDetailsRow = (carDetails) => `<tr>
            <td colspan="12">fuel: ${carDetails.fuel},
            shifter: ${carDetails.shifter},
            power: ${carDetails.power},
            createdAt: ${carDetails.createdAt}</td>
        </tr>`;

// eslint-disable-next-line no-unused-vars
const getCarDetails = (listingId) => {
  fetch(`/api/listings/${listingId}`, {
    method: 'GET',
  }).then((response) => response.json())
    .then((response) => {
      console.log({ response });
      const messageContainer = document.getElementById('message-container');
      const detailsContainer = document.getElementById(`details-container-${listingId}`);
      if (response) {
        detailsContainer.innerHTML = returnCarDetailsRow(response);
        messageContainer.innerText = 'Details found.';
      } else {
        messageContainer.innerText = 'Something went wrong.';
      }
    }).catch((error) => {
      console.log({ error });
    });
};

const listingDetails = () => `
  <div>No picture.</div>
  `;

// eslint-disable-next-line no-unused-vars
const deletePicture = async (pictureId, listingId) => {
  fetch(`/api/pictures/${pictureId}`, {
    method: 'DELETE',
  }).then((response) => response.json())
    .then(() => {
      const messageContainer = document.getElementById('message-container');
      messageContainer.innerText = 'Picture deleted.';
    }).catch((error) => {
      console.log({ error });
    });
  fetch(`/api/listings/${listingId}`, {
    method: 'GET',
  }).then((response) => response.json())
    .then((response) => {
      const listingContainer = document.getElementById('picture-container');
      listingContainer.innerHTML = listingDetails(response);
    }).catch((error) => {
      console.log({ error });
    });
};
