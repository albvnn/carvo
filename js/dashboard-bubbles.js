
document.addEventListener('DOMContentLoaded', function(event) {
  const bubbles = document.querySelectorAll('.dashboard-bubble');
  const explainer = document.getElementById('dashboard-feature-explainer');
  const featureDescriptions = {
    analytics: {
      title: 'Fleet Analytics',
      desc: 'Get real-time insights into your fleet\'s performance, utilization, and trends. Visual dashboards help you make data-driven decisions for efficiency and sustainability.'
    },
    maintenance: {
      title: 'Maintenance Management',
      desc: 'Track upcoming maintenance, receive automated reminders, and keep your vehicles in top condition. Reduce downtime and extend fleet lifespan.'
    },
    emissions: {
      title: 'CO₂ Tracking',
      desc: 'Monitor your fleet\'s carbon emissions and environmental impact. Set reduction goals and see your progress toward a greener operation.'
    }
  };

  if (!explainer) return;

  bubbles.forEach(function(bubble) {
    bubble.addEventListener('click', function(e) {
      e.stopPropagation();
      const feature = bubble.getAttribute('data-feature');
      const info = featureDescriptions[feature];
      if (!info) return;
      explainer.innerHTML = `
        <div class="explainer-content">
          <button class="explainer-close" aria-label="Close">&times;</button>
          <h3>${info.title}</h3>
          <p>${info.desc}</p>
        </div>
      `;
      explainer.style.display = 'block';
      setTimeout(function() { explainer.classList.add('active'); }, 10);
    });
  });

  document.addEventListener('click', function() {
    if (explainer.style.display === 'block') {
      explainer.style.display = 'none';
      explainer.classList.remove('active');
    }
  });
  explainer.addEventListener('click', function(e) {
    e.stopPropagation();
    var target = e.target;
    if (target && target instanceof HTMLElement && target.classList.contains('explainer-close')) {
      explainer.style.display = 'none';
      explainer.classList.remove('active');
    }
  });
}); 