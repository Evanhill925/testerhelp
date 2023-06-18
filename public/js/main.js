const deleteInput = document.querySelectorAll('.fa-trash')

Array.from(deleteInput).forEach( (element) => {
    element.addEventListener('click', deleteBill)
})


async function deleteBill(){
    const bName = document.querySelector('.bill-name').innerHTML
    const bAmount = document.querySelector('.amount').innerHTML

    try {
        const response = await fetch ('/deleteBill', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'billNameS': bName,
                'billAmountS': bAmount
            })
        })

        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }
}