// Variables

const container = document.querySelector('.container')

const infoText = document.querySelector('.infoText')

const movieList = document.querySelector('#movies')

const seatCount = document.querySelector('#count')

const priceAmount = document.querySelector('#amount')

const seats = document.querySelectorAll('.seat:not(.reserved)')


// Storage Set Item Function

const saveToDatabase = (index) => {

    localStorage.setItem('seatsIndex', JSON.stringify(index))
}

// movie list setting

movieList.addEventListener('change', () => {
    localStorage.setItem('movieIndex', JSON.stringify(movieList.selectedIndex));
});

//Storage get Item Function

const getFromDatabase = () => {

    const dbSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'))

    if (dbSelectedSeats !== null) {
        seats.forEach((seat, index) => {

            if (dbSelectedSeats.includes(index)) {
                seat.classList.add('selected')
            }
        });
    }


    // Get selected movie from local storage
    const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'));
    if (dbSelectedMovie !== null) {
        movieList.selectedIndex = dbSelectedMovie;
    }

};

getFromDatabase()


// Index Creation Function

const createIndex = () => {
    let allSeatsArray = []

    seats.forEach((seat) => {
        allSeatsArray.push(seat)
    })

    const allSelectedSeatsArray = []

    const allSelectedSeats = container.querySelectorAll('.seat.selected')

    allSelectedSeats.forEach((selectedSeat) => {
        allSelectedSeatsArray.push(selectedSeat)
    })

    const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {

        return allSeatsArray.indexOf(selectedSeat);

    })

    saveToDatabase(selectedSeatsIndex)
}



//Calculation Function

const calcTotal = () => {

    let selectedSeatCount =
        container.querySelectorAll('.seat.selected').length

    seatCount.innerText = selectedSeatCount

    priceAmount.innerText = selectedSeatCount * movieList.value

    if (selectedSeatCount > 0) {
        infoText.classList.add('open')
    } else {
        infoText.classList.remove('open')
    }

    createIndex()
};
calcTotal()

//Listeners

container.addEventListener('click', (pointerEvent) => {

    const clickedSeat = pointerEvent.target.offsetParent

    if (clickedSeat.classList.contains('seat') &&
        !clickedSeat.classList.contains('reserved')
    ) {
        clickedSeat.classList.toggle('selected')
    }
    calcTotal()
})

movieList.addEventListener('change', () => {
    calcTotal()
})
