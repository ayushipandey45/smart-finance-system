document.getElementById('finance-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Stop form from reloading the page
  
    // Get user input
    const age = parseInt(document.getElementById('age').value);
    const income = parseFloat(document.getElementById('income').value);
    const expenses = parseFloat(document.getElementById('expenses').value);
    const goal = document.getElementById('goal').value;
    const category = document.getElementById('category').value;
  
    const savings = income - expenses;
    const savingsRate = savings / income;
  
    // AI-style recommendation logic
    let advice = "📢 Here's what we think you should know:\n\n";
  
    if (age < 25) {
      advice += "- Start early with small investments. Use SIPs or mutual funds to grow wealth steadily.\n";
    } else if (age <= 40) {
      advice += "- Prioritize emergency funds and long-term goals like retirement or home buying.\n";
    } else {
      advice += "- Diversify income streams and think about stable investments like real estate or PPF.\n";
    }
  
    if (category === "Food" || category === "Shopping") {
      advice += "- Try meal planning and cut impulse buying to save more.\n";
    } else if (category === "Entertainment") {
      advice += "- Track non-essential subscriptions. Consider free or low-cost activities.\n";
    }
  
    if (savingsRate < 0.1) {
      advice += "- You're saving less than 10%. Consider reviewing fixed and variable expenses.\n";
    } else if (savingsRate < 0.3) {
      advice += "- You're doing okay. Try investing the saved portion in SIPs or index funds.\n";
    } else {
      advice += "- Great job! You can allocate funds to both investment and insurance smartly.\n";
    }
  
    advice += \n🎯 Financial Goal: ${goal.toUpperCase()}\n💰 Potential Monthly Savings: ₹${savings.toFixed(2)};
  
    // Display advice
    const adviceDiv = document.getElementById('advice-output');
    adviceDiv.innerText = advice;
  
    // Scroll to advice
    document.getElementById('advice-section').scrollIntoView({ behavior: 'smooth' });
  
    // Update budget chart
    updateBudgetChart(income, expenses, savings);
  });
  
  // Draw or update the budget chart
  let chartInstance = null;
  
  function updateBudgetChart(income, expenses, savings) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
  
    const data = {
      labels: ['Expenses', 'Savings'],
      datasets: [{
        label: 'Monthly Budget Breakdown',
        data: [expenses, savings],
        backgroundColor: ['#ff7043', '#81c784'],
        borderColor: ['#ef6c00', '#388e3c'],
        borderWidth: 2
      }]
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#444',
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return ${tooltipItem.label}: ₹${tooltipItem.raw.toFixed(2)};
            }
          }
        }
      }
    };
  
    // Destroy existing chart before creating a new one
    if (chartInstance !== null) {
      chartInstance.destroy();
    }
  
    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options
    });
  
    // Scroll to chart
    document.getElementById('chart-section').scrollIntoView({ behavior: 'smooth' });
  }
