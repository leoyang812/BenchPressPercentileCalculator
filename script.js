async function fetchData() {
  try {
    console.log('Fetching data from data/percentiles.json...');
    const response = await fetch('data/percentiles.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('Data loaded successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function getWeightRange(weight) {
  const weightRanges = [
    "110", "120", "130", "140", "150", "160", "170", "180", "190", "200",
    "210", "220", "230", "240", "250", "260", "270", "280", "290", "300", "310"
  ];
  
  // Find the closest weight range
  let closest = weightRanges[0];
  let minDiff = Math.abs(weight - parseInt(closest));
  
  for (let range of weightRanges) {
    const diff = Math.abs(weight - parseInt(range));
    if (diff < minDiff) {
      minDiff = diff;
      closest = range;
    }
  }
  
  console.log(`Weight ${weight} mapped to range ${closest}`);
  return closest;
}

function interpolate(data, bench) {
  console.log('Interpolating for bench:', bench, 'with data:', data);
  
  if (!data || data.length === 0) {
    console.log('No data available for interpolation');
    return 0;
  }
  
  // If bench is below the lowest value
  if (bench <= data[0].bench) {
    console.log('Bench below minimum, returning:', data[0].percentile);
    return data[0].percentile;
  }
  
  // If bench is above the highest value
  if (bench >= data[data.length - 1].bench) {
    console.log('Bench above maximum, returning:', data[data.length - 1].percentile);
    return data[data.length - 1].percentile;
  }
  
  // Find the two data points to interpolate between
  for (let i = 0; i < data.length - 1; i++) {
    const a = data[i];
    const b = data[i + 1];
    
    if (bench >= a.bench && bench <= b.bench) {
      const ratio = (bench - a.bench) / (b.bench - a.bench);
      const result = Math.round(a.percentile + ratio * (b.percentile - a.percentile));
      console.log(`Interpolated percentile: ${result} (between ${a.percentile} and ${b.percentile})`);
      return result;
    }
  }
  
  console.log('No interpolation found, returning 0');
  return 0;
}

function getStrengthLevel(percentile) {
  console.log('Getting strength level for percentile:', percentile);
  
  if (percentile >= 95) return { level: "World Class", color: "#FFD700", description: "Exceptional strength, among the top 5% of lifters" };
  if (percentile >= 80) return { level: "Elite", color: "#FF6B35", description: "Advanced strength, among the top 20% of lifters" };
  if (percentile >= 50) return { level: "Advanced", color: "#4ECDC4", description: "Strong performance, above average strength" };
  if (percentile >= 20) return { level: "Intermediate", color: "#45B7D1", description: "Good strength, solid foundation" };
  if (percentile >= 5) return { level: "Novice", color: "#96CEB4", description: "Developing strength, consistent training needed" };
  return { level: "Beginner", color: "#FFEAA7", description: "Starting strength journey, focus on form and consistency" };
}

function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j == 1 && k != 11) {
    return num + "st";
  }
  if (j == 2 && k != 12) {
    return num + "nd";
  }
  if (j == 3 && k != 13) {
    return num + "rd";
  }
  return num + "th";
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, setting up event listeners...');
  
  // Get the form element
  const form = document.getElementById('calculator-form');
  if (!form) {
    console.error('Form not found!');
    return;
  }
  
  // Add form submit event listener
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    console.log('Form submitted, processing...');
    
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;
    const bench = parseInt(document.getElementById('bench').value);
    const compareBy = document.getElementById('compareBy').value;
    const resultDiv = document.getElementById('result');
    
    console.log('Form values:', { age, weight, gender, bench, compareBy });
    
    // Validate inputs
    if (!age || !weight || !gender || !bench || !compareBy) {
      alert('Please fill in all fields');
      return;
    }
    
    // Validate ranges
    if (age < 15 || age > 90) {
      alert('Age must be between 15 and 90 years');
      return;
    }
    
    if (weight < 110 || weight > 310) {
      alert('Weight must be between 110 and 310 lbs');
      return;
    }
    
    if (bench < 1 || bench > 1000) {
      alert('Bench press must be between 1 and 1000 lbs');
      return;
    }
    
    // Additional realistic validation
    if (bench > weight * 2) {
      alert('Bench press cannot be more than twice your body weight. Please check your input.');
      return;
    }
    
    if (bench < weight * 0.1) {
      alert('Bench press seems very low for your weight. Please check your input.');
      return;
    }
    
    try {
      const data = await fetchData();
      let dataset;
      let comparisonDetails = '';
      
      if (compareBy === "by_age") {
        // Find the closest age in our data
        const ages = Object.keys(data.by_age[gender]).map(Number).sort((a, b) => a - b);
        let closestAge = ages[0];
        let minDiff = Math.abs(age - closestAge);
        
        for (let ageKey of ages) {
          const diff = Math.abs(age - ageKey);
          if (diff < minDiff) {
            minDiff = diff;
            closestAge = ageKey;
          }
        }
        
        dataset = data.by_age[gender][closestAge.toString()];
        comparisonDetails = `Compared to ${gender}s aged ${closestAge} years`;
        
        console.log('Age comparison:', { age, closestAge, dataset });
        
        if (!dataset) {
          throw new Error(`No data available for ${gender}s aged ${closestAge}`);
        }
      } else if (compareBy === "by_weight") {
        const weightRange = getWeightRange(weight);
        dataset = data.by_weight[gender][weightRange];
        comparisonDetails = `Compared to ${gender}s weighing around ${weightRange} lbs`;
        
        console.log('Weight comparison:', { weight, weightRange, dataset });
        
        if (!dataset) {
          throw new Error(`No data available for ${gender}s weighing around ${weightRange} lbs`);
        }
      } else {
        throw new Error("Please select a valid comparison method");
      }
      
      const percentile = interpolate(dataset, bench);
      const strengthInfo = getStrengthLevel(percentile);
      
      console.log('Results:', { percentile, strengthInfo });
      
      // Update the result display
      const percentileElement = document.getElementById('percentile-value');
      const strengthElement = document.getElementById('strength-level');
      const detailsElement = document.getElementById('comparison-details');
      
      if (percentileElement) {
        percentileElement.textContent = getOrdinalSuffix(percentile);
      }
      
      if (strengthElement) {
        strengthElement.textContent = strengthInfo.level;
      }
      
      if (detailsElement) {
        detailsElement.textContent = comparisonDetails;
      }
      
      // Update strength badge styling
      const strengthBadge = document.getElementById('strength-badge');
      if (strengthBadge) {
        strengthBadge.style.backgroundColor = strengthInfo.color;
        strengthBadge.style.color = strengthInfo.level === "World Class" || strengthInfo.level === "Elite" ? "white" : "#333";
      }
      
      // Show the result
      if (resultDiv) {
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
      }
      
      console.log('Results displayed successfully');
      
    } catch (error) {
      console.error('Calculation error:', error);
      alert(`Error: ${error.message}`);
    }
  });
  
  // Add focus effects to form inputs
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Add loading state to calculate button
  const calculateBtn = document.querySelector('.calculate-btn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', function() {
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
      this.disabled = true;
      
      // Reset button after a short delay
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-calculator"></i> Calculate Strength Level';
        this.disabled = false;
      }, 2000);
    });
  }
  
  console.log('Event listeners set up successfully');
});
  