'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ── Types ──────────────────────────────────────────────────────────────────
interface DayStats {
  date: string;
  totalWorkTime: number;
  totalBreakTime: number;
  totalLongBreakTime: number;
  totalSessions: number;
  totalListenTime: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksCompleted_high: number;
  tasksCompleted_medium: number;
  tasksCompleted_low: number;
  totalDeflectionsAttempted: number;
}

interface Statistics {
  days: DayStats[];
}

// ── Helper ─────────────────────────────────────────────────────────────────
function fmtTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

// ── Card ───────────────────────────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ── Main inner component (uses useSearchParams) ────────────────────────────
function TrackContent() {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [activeFrame, setActiveFrame] = useState(0);
  const [ready, setReady] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const pomodoroRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef<HTMLDivElement>(null);
  const tasksRef = useRef<HTMLDivElement>(null);
  const tasksPrioRef = useRef<HTMLDivElement>(null);
  const blockedRef = useRef<HTMLDivElement>(null);

  const timeFrames = [7, 30, 90, 180];
  const timeLabels = ['7 Days', '30 Days', '90 Days', '180 Days'];

  // ── Load data from URL ──────────────────────────────────────────────────
  useEffect(() => {
    const raw = searchParams.get('data');
    if (raw) {
      try {
        const parsed = JSON.parse(decodeURIComponent(raw));
        setStats(parsed);
      } catch {
        console.error('Failed to parse statistics data');
      }
    }
    setReady(true);
  }, [searchParams]);

  // ── ECharts dynamic import & render ─────────────────────────────────────
  useEffect(() => {
    if (!stats?.days || !ready) return;
    let cancelled = false;

    import('echarts').then((echarts) => {
      if (cancelled) return;

      const purple1 = '#AC54FF';
      const purple2 = '#9148D9';
      const purple3 = '#7439AD';
      const textColor = '#c4b5d4';
      const bgTooltip = '#0e0621';
      const fontFam = "'Outfit', sans-serif";

      const year = new Date().getFullYear();
      const calData = stats.days.map((d) => [
        d.date,
        Math.floor(
          ((d.totalWorkTime || 0) +
            (d.totalBreakTime || 0) +
            (d.totalLongBreakTime || 0)) /
            60
        ),
      ]);

      // Calendar heatmap
      if (calendarRef.current) {
        const c = echarts.init(calendarRef.current);
        c.setOption({
          title: {
            text: 'Activity Heatmap',
            left: 'center',
            top: 16,
            textStyle: {
              color: '#e2d9f3',
              fontFamily: fontFam,
              fontSize: 14,
              fontWeight: 600,
            },
          },
          tooltip: {
            backgroundColor: bgTooltip,
            textStyle: { color: textColor, fontFamily: fontFam },
          },
          visualMap: {
            min: 1,
            max: 120,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 52,
            textStyle: { color: textColor, fontFamily: fontFam },
            inRange: {
              color: ['#3F1E5E', '#5D2E8C', '#7439AD', '#9148D9', '#AC54FF'],
            },
          },
          calendar: {
            top: 100,
            left: 20,
            right: 20,
            cellSize: ['auto', 13],
            range: year,
            itemStyle: {
              borderWidth: 0.5,
              borderColor: '#2a1550',
              color: '#12063a',
            },
            dayLabel: { color: textColor, fontFamily: fontFam },
            monthLabel: { color: textColor, fontFamily: fontFam },
            yearLabel: { show: false },
          },
          series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: calData,
          },
        });
        window.addEventListener('resize', () => c.resize());
      }

      // Sliced data helper
      const sliced = (n: number) =>
        [...stats.days]
          .sort(
            (a, b) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, n)
          .reverse();

      const renderDependent = (n: number) => {
        const data = sliced(n);
        const dates = data.map((d) => d.date);
        const axisLabel = { color: textColor, fontFamily: fontFam, fontSize: 11 };
        const titleStyle = {
          color: '#e2d9f3',
          fontFamily: fontFam,
          fontSize: 14,
          fontWeight: 600,
        };
        const tooltip = {
          trigger: 'axis' as const,
          backgroundColor: bgTooltip,
          textStyle: { color: textColor, fontFamily: fontFam },
        };
        const legend = { textStyle: { color: textColor, fontFamily: fontFam } };

        // Pomodoro
        if (pomodoroRef.current) {
          const c = echarts.init(pomodoroRef.current);
          c.setOption({
            title: { text: 'Pomodoro Sessions', left: 'center', top: 16, textStyle: titleStyle },
            tooltip,
            legend: { ...legend, data: ['Work', 'Break', 'Long Break'] },
            xAxis: [{ type: 'category', data: dates, axisTick: { show: false }, axisLabel }],
            yAxis: [{ type: 'value', axisLabel }],
            series: [
              {
                name: 'Work',
                type: 'bar',
                data: data.map((d) => Math.floor((d.totalWorkTime || 0) / 60)),
                color: purple1,
              },
              {
                name: 'Break',
                type: 'bar',
                data: data.map((d) => Math.floor((d.totalBreakTime || 0) / 60)),
                color: purple2,
              },
              {
                name: 'Long Break',
                type: 'bar',
                data: data.map((d) =>
                  Math.floor((d.totalLongBreakTime || 0) / 60)
                ),
                color: purple3,
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }

        // Sessions
        if (sessionRef.current) {
          const c = echarts.init(sessionRef.current);
          c.setOption({
            title: { text: 'Daily Sessions', left: 'center', top: 16, textStyle: titleStyle },
            tooltip,
            xAxis: [{ type: 'category', data: dates, axisTick: { alignWithLabel: true }, axisLabel }],
            yAxis: [{ type: 'value', axisLabel }],
            series: [
              {
                name: 'Sessions',
                type: 'bar',
                barWidth: '60%',
                data: data.map((d) => d.totalSessions || 0),
                color: purple1,
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }

        // Sound
        if (soundRef.current) {
          const c = echarts.init(soundRef.current);
          c.setOption({
            title: { text: 'Sound Listen Time (min)', left: 'center', top: 16, textStyle: titleStyle },
            tooltip,
            xAxis: [{ type: 'category', data: dates, axisTick: { alignWithLabel: true }, axisLabel }],
            yAxis: [{ type: 'value', axisLabel }],
            series: [
              {
                name: 'Listen Time',
                type: 'bar',
                barWidth: '60%',
                data: data.map((d) =>
                  Math.floor((d.totalListenTime || 0) / 60)
                ),
                color: purple1,
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }

        // Tasks total
        if (tasksRef.current) {
          const c = echarts.init(tasksRef.current);
          c.setOption({
            title: { text: 'Tasks Overview', left: 'center', top: 16, textStyle: titleStyle },
            tooltip,
            legend: { ...legend, data: ['Completed', 'Pending'] },
            xAxis: { type: 'value', axisLabel },
            yAxis: {
              type: 'category',
              data: dates,
              axisTick: { alignWithLabel: true },
              axisLabel,
            },
            series: [
              {
                name: 'Completed',
                type: 'bar',
                stack: 'total',
                data: data.map((d) => d.tasksCompleted || 0),
                color: purple1,
                emphasis: { focus: 'series' },
              },
              {
                name: 'Pending',
                type: 'bar',
                stack: 'total',
                data: data.map((d) => d.tasksPending || 0),
                color: purple3,
                emphasis: { focus: 'series' },
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }

        // Tasks by priority
        if (tasksPrioRef.current) {
          const c = echarts.init(tasksPrioRef.current);
          c.setOption({
            title: {
              text: 'Completed Tasks by Priority',
              left: 'center',
              top: 16,
              textStyle: titleStyle,
            },
            tooltip,
            legend: { ...legend, data: ['High', 'Medium', 'Low'] },
            xAxis: [{ type: 'category', data: dates, axisTick: { show: false }, axisLabel }],
            yAxis: [{ type: 'value', axisLabel }],
            series: [
              {
                name: 'High',
                type: 'bar',
                data: data.map((d) => d.tasksCompleted_high || 0),
                color: purple1,
                emphasis: { focus: 'series' },
              },
              {
                name: 'Medium',
                type: 'bar',
                data: data.map((d) => d.tasksCompleted_medium || 0),
                color: purple2,
                emphasis: { focus: 'series' },
              },
              {
                name: 'Low',
                type: 'bar',
                data: data.map((d) => d.tasksCompleted_low || 0),
                color: purple3,
                emphasis: { focus: 'series' },
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }

        // Blocked pages
        if (blockedRef.current) {
          const c = echarts.init(blockedRef.current);
          c.setOption({
            title: {
              text: 'Blocked Page Attempts',
              left: 'center',
              top: 16,
              textStyle: titleStyle,
            },
            tooltip: { trigger: 'axis', backgroundColor: bgTooltip, textStyle: { color: textColor, fontFamily: fontFam } },
            xAxis: { type: 'category', data: dates, axisLabel },
            yAxis: { type: 'value', axisLabel },
            series: [
              {
                data: data.map((d) => d.totalDeflectionsAttempted || 0),
                type: 'line',
                smooth: true,
                color: purple1,
              },
            ],
          });
          window.addEventListener('resize', () => c.resize());
        }
      };

      renderDependent(timeFrames[activeFrame]);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, ready, activeFrame]);

  // ── Today stats ─────────────────────────────────────────────────────────
  const today = new Date().toISOString().split('T')[0];
  const todayStats =
    stats?.days?.find((d) => d.date === today) || ({} as DayStats);

  const cards = [
    { icon: '⏱', label: 'Focus Time', value: fmtTime(todayStats.totalWorkTime || 0) },
    { icon: '✅', label: 'Tasks Done', value: String(todayStats.tasksCompleted || 0) },
    {
      icon: '🎵',
      label: 'Quiet Time',
      value: `${Math.floor((todayStats.totalListenTime || 0) / 60)}min`,
    },
    {
      icon: '🛡',
      label: 'Blocked',
      value: String(todayStats.totalDeflectionsAttempted || 0),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .track-wrapper {
          min-height: 100vh;
          padding: 100px 5% 80px;
          color: #e2d9f3;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .track-wrapper::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 20%, rgba(168,85,247,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 80% 70%, rgba(99,102,241,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }
        .track-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        .track-header { margin-bottom: 2.5rem; }
        .label-tag {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a855f7;
          background: rgba(168,85,247,0.1);
          border: 1px solid rgba(168,85,247,0.25);
          border-radius: 20px;
          padding: 4px 14px;
          margin-bottom: 1rem;
        }
        .page-heading {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 0.75rem;
          color: #fff;
        }
        .gradient-text {
          background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .page-sub {
          font-size: 1rem;
          color: rgba(196,181,212,0.7);
          margin: 0;
          max-width: 520px;
        }

        /* No-data */
        .no-data {
          text-align: center;
          padding: 5rem 2rem;
        }
        .no-data-icon { font-size: 3.5rem; margin-bottom: 1.2rem; }
        .no-data h2 { font-size: 1.5rem; color: #e2d9f3; margin-bottom: 0.6rem; }
        .no-data p {
          color: rgba(196,181,212,0.6);
          font-size: 0.95rem;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Cards */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(168,85,247,0.18);
          border-radius: 16px;
          padding: 1.4rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
          animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
          backdrop-filter: blur(12px);
        }
        .stat-card:hover {
          border-color: rgba(168,85,247,0.45);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(168,85,247,0.12);
        }
        .stat-icon { font-size: 1.4rem; }
        .stat-value { font-size: 1.8rem; font-weight: 700; color: #fff; line-height: 1; }
        .stat-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(196,181,212,0.6);
        }

        /* Timeframe */
        .timeframe-bar {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .tf-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 6px 18px;
          border-radius: 20px;
          border: 1px solid rgba(168,85,247,0.25);
          background: transparent;
          color: rgba(196,181,212,0.7);
          cursor: pointer;
          transition: all 0.2s;
        }
        .tf-btn:hover { border-color: rgba(168,85,247,0.5); color: #e2d9f3; }
        .tf-btn.active {
          background: rgba(168,85,247,0.15);
          border-color: rgba(168,85,247,0.5);
          color: #fff;
        }

        /* Charts grid */
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .chart-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(168,85,247,0.14);
          border-radius: 18px;
          padding: 1rem 0.5rem 0.5rem;
          backdrop-filter: blur(12px);
          transition: border-color 0.25s;
          animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .chart-card:hover { border-color: rgba(168,85,247,0.3); }
        .chart-card.full { grid-column: 1 / -1; }
        .chart-box { width: 100%; height: 280px; }
        .chart-box.tall { height: 340px; }

        .section-divider {
          border: none;
          border-top: 1px solid rgba(168,85,247,0.1);
          margin: 2rem 0;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .charts-grid { grid-template-columns: 1fr; }
          .chart-card.full { grid-column: 1; }
        }
      `}</style>

      <div className="track-wrapper">
        <div className="track-inner">

          {/* ── Header ── */}
          <div className="track-header">
            <span className="label-tag">Statistics</span>
            <h1 className="page-heading">
              Your <span className="gradient-text">Productivity</span> Tracking
            </h1>
            <p className="page-sub">
              Visualize your focus sessions, tasks, and habits over time.
            </p>
          </div>

          {/* ── No-data state ── */}
          {ready && !stats?.days?.length && (
            <div className="no-data">
              <div className="no-data-icon">📊</div>
              <h2>No data yet</h2>
              <p>
                Start using the DFCraft extension to track your productivity
                sessions. Your stats will appear here.
              </p>
            </div>
          )}

          {/* ── Data exists ── */}
          {stats?.days?.length ? (
            <>
              {/* Today cards */}
              <div className="cards-grid">
                {cards.map((c, i) => (
                  <StatCard
                    key={c.label}
                    icon={c.icon}
                    label={c.label}
                    value={c.value}
                    delay={i * 80}
                  />
                ))}
              </div>

              <hr className="section-divider" />

              {/* Calendar */}
              <div className="chart-card full" style={{ animationDelay: '200ms' }}>
                <div ref={calendarRef} className="chart-box tall" />
              </div>

              <hr className="section-divider" />

              {/* Timeframe switcher */}
              <div className="timeframe-bar">
                {timeLabels.map((label, i) => (
                  <button
                    key={label}
                    className={`tf-btn${activeFrame === i ? ' active' : ''}`}
                    onClick={() => setActiveFrame(i)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Charts */}
              <div className="charts-grid">
                <div className="chart-card" style={{ animationDelay: '250ms' }}>
                  <div ref={pomodoroRef} className="chart-box" />
                </div>
                <div className="chart-card" style={{ animationDelay: '300ms' }}>
                  <div ref={sessionRef} className="chart-box" />
                </div>
                <div className="chart-card" style={{ animationDelay: '350ms' }}>
                  <div ref={soundRef} className="chart-box" />
                </div>
                <div className="chart-card" style={{ animationDelay: '400ms' }}>
                  <div ref={blockedRef} className="chart-box" />
                </div>
                <div className="chart-card full" style={{ animationDelay: '450ms' }}>
                  <div ref={tasksRef} className="chart-box" />
                </div>
                <div className="chart-card full" style={{ animationDelay: '500ms' }}>
                  <div ref={tasksPrioRef} className="chart-box" />
                </div>
              </div>
            </>
          ) : null}

        </div>
      </div>
    </>
  );
}

// ── Page export ────────────────────────────────────────────────────────────
export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(196,181,212,0.5)',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1rem',
            letterSpacing: '0.1em',
          }}
        >
          Loading statistics…
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}