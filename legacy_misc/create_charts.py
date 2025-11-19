#!/usr/bin/env python3
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

# Set style
plt.style.use('seaborn-v0_8-darkgrid')

# 1. Market Growth Projection Chart
fig, ax = plt.subplots(figsize=(12, 6))
years = [2024, 2025, 2026, 2027, 2028, 2029, 2030]
market_size = [297.71, 340, 390, 450, 510, 560, 612.71]

ax.plot(years, market_size, marker='o', linewidth=3, markersize=10, color='#2E86AB')
ax.fill_between(years, market_size, alpha=0.3, color='#2E86AB')
ax.set_xlabel('Year', fontsize=14, fontweight='bold')
ax.set_ylabel('Market Size ($ Billion)', fontsize=14, fontweight='bold')
ax.set_title('Global RWA Tokenization Market Growth (2024-2030)', fontsize=16, fontweight='bold')
ax.grid(True, alpha=0.3)
for i, v in enumerate(market_size):
    ax.text(years[i], v + 10, f'${v}B', ha='center', fontsize=10, fontweight='bold')
plt.tight_layout()
plt.savefig('chart_market_growth.png', dpi=300, bbox_inches='tight')
plt.close()

# 2. Cost Comparison Chart
fig, ax = plt.subplots(figsize=(12, 7))
platforms = ['XRPL Fund\nMgmt', 'Securitize', 'Polymath', 'tZERO', 'Archax', 'Tokeny']
costs = [0.00001, 27.5, 0.055, 55, 5.5, 27.5]  # Average costs in USD

colors = ['#06D6A0', '#EF476F', '#EF476F', '#EF476F', '#EF476F', '#EF476F']
bars = ax.bar(platforms, costs, color=colors, edgecolor='black', linewidth=1.5)

ax.set_ylabel('Transaction Cost (USD)', fontsize=14, fontweight='bold')
ax.set_title('Transaction Cost Comparison: XRPL vs Competitors', fontsize=16, fontweight='bold')
ax.set_yscale('log')
ax.grid(True, alpha=0.3, axis='y')

for i, (bar, cost) in enumerate(zip(bars, costs)):
    height = bar.get_height()
    if i == 0:
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'${cost}', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#06D6A0')
    else:
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'${cost}', ha='center', va='bottom', fontsize=10, fontweight='bold')

plt.tight_layout()
plt.savefig('chart_cost_comparison.png', dpi=300, bbox_inches='tight')
plt.close()

# 3. Revenue Projection Chart
fig, ax = plt.subplots(figsize=(12, 6))
years = [2025, 2026, 2027, 2028, 2029, 2030]
revenue = [0, 0.7, 3.6, 12.75, 33, 81]
costs = [0.0001, 0.07, 0.12, 0.18, 0.22, 0.25]
profit = [r - c for r, c in zip(revenue, costs)]

x = np.arange(len(years))
width = 0.35

bars1 = ax.bar(x - width/2, revenue, width, label='Revenue', color='#06D6A0', edgecolor='black')
bars2 = ax.bar(x + width/2, profit, width, label='Profit', color='#2E86AB', edgecolor='black')

ax.set_xlabel('Year', fontsize=14, fontweight='bold')
ax.set_ylabel('Amount ($ Million)', fontsize=14, fontweight='bold')
ax.set_title('5-Year Revenue & Profit Projection', fontsize=16, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(years)
ax.legend(fontsize=12)
ax.grid(True, alpha=0.3, axis='y')

for bars in [bars1, bars2]:
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'${height:.1f}M', ha='center', va='bottom', fontsize=9, fontweight='bold')

plt.tight_layout()
plt.savefig('chart_revenue_projection.png', dpi=300, bbox_inches='tight')
plt.close()

# 4. Settlement Speed Comparison
fig, ax = plt.subplots(figsize=(12, 6))
platforms = ['XRPL Fund\nMgmt', 'Securitize', 'Polymath', 'tZERO', 'Archax', 'Tokeny']
settlement_seconds = [4, 172800, 172800, 172800, 172800, 172800]  # 3-5 sec vs T+2 days (172800 sec)

colors = ['#06D6A0', '#EF476F', '#EF476F', '#EF476F', '#EF476F', '#EF476F']
bars = ax.barh(platforms, settlement_seconds, color=colors, edgecolor='black', linewidth=1.5)

ax.set_xlabel('Settlement Time (seconds, log scale)', fontsize=14, fontweight='bold')
ax.set_title('Settlement Speed Comparison: XRPL vs Competitors', fontsize=16, fontweight='bold')
ax.set_xscale('log')
ax.grid(True, alpha=0.3, axis='x')

for i, (bar, time) in enumerate(zip(bars, settlement_seconds)):
    width = bar.get_width()
    if i == 0:
        label = '3-5 sec'
        color = '#06D6A0'
    else:
        label = 'T+2 days'
        color = '#EF476F'
    ax.text(width, bar.get_y() + bar.get_height()/2.,
            f' {label}', ha='left', va='center', fontsize=11, fontweight='bold', color=color)

plt.tight_layout()
plt.savefig('chart_settlement_speed.png', dpi=300, bbox_inches='tight')
plt.close()

# 5. ROI Comparison Chart
fig, ax = plt.subplots(figsize=(12, 6))
years = [0, 1, 2, 3, 4, 5]
roi_percentages = [0, 630000, 4110000, 16680000, 49460000, 130210000]

ax.plot(years, [r/1000 for r in roi_percentages], marker='o', linewidth=3, markersize=10, color='#06D6A0')
ax.fill_between(years, [r/1000 for r in roi_percentages], alpha=0.3, color='#06D6A0')
ax.set_xlabel('Year', fontsize=14, fontweight='bold')
ax.set_ylabel('ROI (Thousands of %)', fontsize=14, fontweight='bold')
ax.set_title('Extraordinary ROI Growth (5-Year Projection)', fontsize=16, fontweight='bold')
ax.grid(True, alpha=0.3)

for i, v in enumerate(roi_percentages):
    if v > 0:
        ax.text(years[i], v/1000 + 2000, f'{v/1000000:.1f}M%', ha='center', fontsize=10, fontweight='bold')

plt.tight_layout()
plt.savefig('chart_roi_growth.png', dpi=300, bbox_inches='tight')
plt.close()

# 6. Development Cost Comparison
fig, ax = plt.subplots(figsize=(12, 6))
platforms = ['XRPL Fund\nMgmt\n(Sandeep)', 'Typical\nCompetitor\n(Team of 20)', 'Enterprise\nSolution\n(Team of 50)']
dev_costs = [0.0001, 1.5, 5.0]  # in millions

colors = ['#06D6A0', '#FFB703', '#EF476F']
bars = ax.bar(platforms, dev_costs, color=colors, edgecolor='black', linewidth=2)

ax.set_ylabel('Development Cost ($ Million)', fontsize=14, fontweight='bold')
ax.set_title('Development Cost Comparison: Solo vs Team Development', fontsize=16, fontweight='bold')
ax.grid(True, alpha=0.3, axis='y')

for i, (bar, cost) in enumerate(zip(bars, dev_costs)):
    height = bar.get_height()
    if i == 0:
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'$100\n(99.99% savings!)', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#06D6A0')
    else:
        ax.text(bar.get_x() + bar.get_width()/2., height,
                f'${cost}M', ha='center', va='bottom', fontsize=11, fontweight='bold')

plt.tight_layout()
plt.savefig('chart_dev_cost_comparison.png', dpi=300, bbox_inches='tight')
plt.close()

print("✅ Created 6 visualization charts:")
print("  - chart_market_growth.png")
print("  - chart_cost_comparison.png")
print("  - chart_revenue_projection.png")
print("  - chart_settlement_speed.png")
print("  - chart_roi_growth.png")
print("  - chart_dev_cost_comparison.png")

