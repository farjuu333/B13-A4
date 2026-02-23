// step 1;
const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

let currentStatus = 'all-filter-btn';

function toggleStyle(id) {
    // adding white bg for all
    allFilterBtn.classList.add('bg-white', 'text-slate-500')
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500')
    rejectedFilterBtn.classList.add('bg-white', 'text-slate-500')

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-blue-600', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-600', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white')

    const selected = document.getElementById(id)
    currentStatus = id

    // adding blue bg for current button
    selected.classList.remove('bg-white', 'text-slate-500')
    selected.classList.add('bg-blue-600', 'text-white')

    // filter start
    const allCards = document.querySelectorAll('.card'); 
    let visibleCount = 0;

    allCards.forEach(card => {
        const statusEl = card.querySelector('.statusElement');
        if (!statusEl) return; 

        const cardStatus = statusEl.innerText.trim().toUpperCase();

        if (id === 'all-filter-btn') {
            card.classList.remove('hidden');
            visibleCount++;
        } 
        else if (id === 'interview-filter-btn') {
            if (cardStatus === 'INTERVIEW') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        } 
        else if (id === 'rejected-filter-btn') {
            if (cardStatus === 'REJECTED') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        }
    });

    const jobsCountText = document.getElementById('8-jobs');
    if (jobsCountText) {
        if (id === 'all-filter-btn') {
            jobsCountText.innerText = `${allCards.length} jobs`;
        } else {
            jobsCountText.innerText = `${visibleCount} of ${allCards.length} jobs`;
        }
    }

    const existingMsg = document.getElementById('no-jobs-msg');
    const allCardSection = document.getElementById('allCard');

    if (visibleCount === 0) {
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
        if (existingMsg) {
            existingMsg.remove();
        }
    }
} 

// step 2 delegation
const interviewCountEl = document.getElementById('interview');
const rejectedCountEl = document.getElementById('rejected');
const totalCountEl = document.getElementById('total');
const allCardSection = document.getElementById('allCard');
const mainContainer = document.querySelector('main');

let interviewList = [];
let rejectedList = [];

function updateCounters() {
    const totalCards = allCardSection.querySelectorAll('.card').length;
    
    if (totalCountEl) totalCountEl.innerText = totalCards;
    if (interviewCountEl) interviewCountEl.innerText = interviewList.length;
    if (rejectedCountEl) rejectedCountEl.innerText = rejectedList.length;

    const jobsCountText = document.getElementById('8-jobs');
    if (jobsCountText) {
        jobsCountText.innerText = `${totalCards} jobs`;
    }

    const existingMsg = document.getElementById('no-jobs-msg');

    if (totalCards === 0) {
        if (!existingMsg) {
            allCardSection.innerHTML = `
                <div id="no-jobs-msg" class="flex flex-col items-center justify-center gap-5 py-[60px] px-10 border border-[#F1F2F4] rounded-lg bg-white w-full">
                    <img src="./jobs.png" alt="">
                    <p class="text-[#002C5C] text-2xl font-semibold text-center">No jobs available</p>
                    <p class="text-slate-500 text-base text-center">Check back soon for new job opportunities</p>
                </div>
            `;
        }
    } else {
        
        const msg = document.getElementById('no-jobs-msg');
        if (msg && currentStatus === 'all-filter-btn') {
            msg.remove();
        }
    }
}

mainContainer.addEventListener('click', function (event) {
    const currentCard = event.target.closest('.card');
    if (!currentCard) return;

    const statusDisplay = currentCard.querySelector('.statusElement');
    const companyNameEl = currentCard.querySelector('.companyName');
    if (!companyNameEl || !statusDisplay) return;

    const companyName = companyNameEl.innerText;

    if (event.target.classList.contains('interview-btn')) {
        if (statusDisplay.innerText !== 'INTERVIEW') {
            statusDisplay.innerText = 'INTERVIEW';
            statusDisplay.className = "statusElement w-fit rounded bg-emerald-50 px-3 py-2 text-emerald-600 font-medium text-sm uppercase";

            if (!interviewList.includes(companyName)) {
                interviewList.push(companyName);
            }
            rejectedList = rejectedList.filter(name => name !== companyName);
            updateCounters();
        }
    }

    if (event.target.classList.contains('rejected-btn')) {
        if (statusDisplay.innerText !== 'REJECTED') {
            statusDisplay.innerText = 'REJECTED';
            statusDisplay.className = "statusElement w-fit rounded bg-red-50 px-3 py-2 text-red-600 font-medium text-sm uppercase";

            if (!rejectedList.includes(companyName)) {
                rejectedList.push(companyName);
            }
            interviewList = interviewList.filter(name => name !== companyName);
            updateCounters();
        }
    }

    if (event.target.closest('.fa-trash-can') || event.target.closest('button.absolute')) {
        cardToRemove = event.target.closest('.card');
        const nameToRemove = cardToRemove.querySelector('.companyName').innerText;

        cardToRemove.remove();
        interviewList = interviewList.filter(item => item !== nameToRemove);
        rejectedList = rejectedList.filter(item => item !== nameToRemove);
        updateCounters();
    }
});

// Initial Load
updateCounters();