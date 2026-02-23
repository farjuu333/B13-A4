// step 1;

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

let currentStatus = 'all-filter-btn';
function toggleStyle(id) {
    // adding white bg for all
    allFilterBtn.classList.add( 'bg-white', 'text-slate-500')
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500')
    rejectedFilterBtn.classList.add('bg-white', 'text-slate-500')

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-blue-600', 'text-white')
     interviewFilterBtn.classList.remove('bg-blue-600', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white')

    // console.log(id);
    const selected = document.getElementById(id)//this is the button that clicked for filter

    currentStatus = id
    console.log(currentStatus);
    // console.log(selected);

    // adding black bg for current button
    selected.classList.remove('bg-white', 'text-slate-500')
    selected.classList.add('bg-blue-600', 'text-white')
        // step 1 finish


        // filter start
        const allCards = document.querySelectorAll('.card'); // all card hold
        let visibleCount = 0;

    allCards.forEach(card => {
        const cardStatus = card.querySelector('.statusElement').innerText.trim().toUpperCase();

        if (id === 'all-filter-btn') {
            // click all button show all cards
            card.classList.remove('hidden');
            visibleCount++;
        } 
        else if (id === 'interview-filter-btn') {
            // click interview button only show card with interview status
            if (cardStatus === 'INTERVIEW') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        } 
        else if (id === 'rejected-filter-btn') {
            // click rejected button only show card with rejected status
            if (cardStatus === 'REJECTED') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        }
    });
    // add 
    const existingMsg = document.getElementById('no-jobs-msg');
    
    if (visibleCount === 0) {
        // after filtering card does not available then execute                                                                                                     
        if (!existingMsg) {
            const noJobsHTML = `
                <div id="no-jobs-msg" class="flex flex-col items-center justify-center gap-5 py-[60px] px-10 border border-[#F1F2F4] rounded-lg bg-white w-full">
                    <img src="./jobs.png" alt="">
                    <p class="text-[#002C5C] text-2xl font-semibold text-center">No jobs available</p>
                    <p class="text-slate-500 text-base text-center">Check back soon for new job opportunities</p>
                </div>
            `;
            allCardSection.insertAdjacentHTML('beforeend', noJobsHTML);
        }
    } else {
        // if any card back then remove msg
        if (existingMsg) {
            existingMsg.remove();}
        }
} 



// step 2 delegation

const interviewCountEl = document.getElementById('interview');
const rejectedCountEl = document.getElementById('rejected');

let interviewList = [];
let rejectedList = [];

const mainContainer = document.querySelector('main');


// hold total count
const totalCountEl = document.getElementById('total');
const allCardSection = document.getElementById('allCard');

// counting card update number
function updateCounters() {
    // count card
    const totalCards = allCardSection.getElementsByClassName('card').length;
    
    totalCountEl.innerText = totalCards; // total count update
    interviewCountEl.innerText = interviewList.length;
    rejectedCountEl.innerText = rejectedList.length;


    //  delete button 
    
    document.getElementById('total').innerText = totalCards;

    // "8 jobs" 
    const jobsCountText = document.getElementById('8-jobs');
    if (jobsCountText) {
        jobsCountText.innerText = `${totalCards} jobs`;
    }

    // show "No Available"
    if (totalCards === 0) {
        allCardSection.innerHTML = `
            <div id="no-jobs-msg" class="flex flex-col items-center justify-center gap-5 py-[60px] px-10 border border-[#F1F2F4] rounded-lg bg-white">
                <img src="./jobs.png" alt="">
                <p class="text-[#002C5C] text-2xl font-semibold text-center">No jobs available</p>
                <p class="text-slate-500 text-base text-center">Check back soon for new job opportunities</p>
            </div>
        `;
    }
    else {
    
        if (existingMsg && currentStatus === 'all-filter-btn') {
            existingMsg.remove();
        }
    }

    

    // update interview and reject counter
    interviewCountEl.innerText = interviewList.length;
    rejectedCountEl.innerText = rejectedList.length;
}

mainContainer.addEventListener('click', function (event) {
    const currentCard = event.target.closest('.card');
    if (!currentCard) return;

    const statusDisplay = currentCard.querySelector('.statusElement');
    const companyName = currentCard.querySelector('.companyName').innerText;

    // interview button
    if (event.target.classList.contains('interview-btn')) {
        if (statusDisplay.innerText !== 'INTERVIEW') {
            statusDisplay.innerText = 'INTERVIEW';
            statusDisplay.className = "statusElement w-fit rounded bg-emerald-50 px-3 py-2 text-emerald-600 font-medium text-sm uppercase";

            if (!interviewList.includes(companyName)) {
                interviewList.push(companyName);
            }
            rejectedList = rejectedList.filter(name => name !== companyName);
            
            updateCounters(); // call here
        }
    }

    // rejected button
    if (event.target.classList.contains('rejected-btn')) {
        if (statusDisplay.innerText !== 'REJECTED') {
            statusDisplay.innerText = 'REJECTED';
            statusDisplay.className = "statusElement w-fit rounded bg-red-50 px-3 py-2 text-red-600 font-medium text-sm uppercase";

            if (!rejectedList.includes(companyName)) {
                rejectedList.push(companyName);
            }
            interviewList = interviewList.filter(name => name !== companyName);
            
            updateCounters(); // call here
        }
    }


// logic of delete
if (event.target.closest('.fa-trash-can') || event.target.closest('button.absolute')) {
    const card = event.target.closest('.card'); // find that card which clicked
    const companyName = card.querySelector('.companyName').innerText;

    // delete card from html
    card.remove();

    // delete data from list
    interviewList = interviewList.filter(item => item !== companyName);
    rejectedList = rejectedList.filter(item => item !== companyName);

    // calling counter update function
    updateCounters();
}

});

// when page load show total card count
updateCounters();