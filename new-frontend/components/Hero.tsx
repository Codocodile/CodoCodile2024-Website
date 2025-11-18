"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeftIcon, PlayIcon } from "@heroicons/react/24/outline";
import { motion, useAnimation } from "framer-motion";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  const [typedText, setTypedText] = useState("");

  const codeSnippets = [
    // DP: Longest Increasing Subsequence
    `function lis(arr) {
  const dp = Array(arr.length).fill(1);
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}`,

    // BFS: Shortest Path in Graph
    `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,

    // DFS: Connected Components (C++)
    `void dfs(int v, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[v] = true;
    for (int u : adj[v]) {
        if (!visited[u]) dfs(u, adj, visited);
    }
}`,

    // DP: 0/1 Knapsack (Python)
    `def knapsack(W, wt, val, n):
    dp = [[0]*(W+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(W+1):
            if wt[i-1] <= w:
                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])
            else:
                dp[i][w] = dp[i-1][w]
    return dp[n][W]`,
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentCode = codeSnippets[codeIndex];
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < currentCode.length) {
        setTypedText(currentCode.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCodeIndex((prev) => (prev + 1) % codeSnippets.length);
          setTypedText("");
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [codeIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero pt-16 lg:pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden grid-pattern">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-primary-200/30 rounded-2xl"
          animate={{
            rotate: [12, 372, 12],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-12 h-12 bg-accent-200/30 rounded-xl"
          animate={{
            rotate: [-12, 348, -12],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-20 h-20 bg-primary-300/20 rounded-3xl"
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-14 h-14 bg-accent-300/20 rounded-2xl"
          animate={{
            rotate: [-12, 348, -12],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Contest-themed code brackets */}
        <motion.div
          className="absolute top-1/3 right-1/4 text-primary-300/10 text-9xl font-mono"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          {"{ }"}
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 text-accent-300/10 text-7xl font-mono"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          {"< / >"}
        </motion.div>
      </div>

      <div className="container-custom relative z-10 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium shadow-soft"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                className="w-2 h-2 bg-primary-500 rounded-full mr-2 rtl:ml-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              مسابقه 2025 - ثبت‌نام باز است
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight w-full">
                <motion.span
                  className="text-foreground block mb-4 font-potk"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  مسابقه
                </motion.span>
                <motion.span
                  className="text-gradient font-potk inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #32814d, #224335)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  کدوکدیل
                </motion.span>
                <motion.span
                  className="text-foreground block mt-4 font-potk"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  را از دست ندهید
                </motion.span>
              </h1>

              {/* Fixed Subtitle */}
              <div className="h-16 flex items-center">
                <span className="text-xl sm:text-2xl lg:text-3xl text-neutral-600 w-full">
                  در بزرگترین{" "}
                  <span className="text-gradient font-semibold">
                    مسابقه برنامه‌نویسی
                  </span>{" "}
                  دانشگاه صنعتی شریف
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-neutral-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              در این مسابقه جذاب، مهارت‌های برنامه‌نویسی و حل مسئله خود را به
              چالش بکشید، با تیم‌های دیگر رقابت کنید و از فرصت‌های یادگیری و رشد
              بهره‌مند شوید.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/sign-up"
                  className="btn btn-primary btn-lg group relative overflow-hidden shadow-glow-primary"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center">
                    شروع مسابقه
                    <ChevronLeftIcon className="w-5 h-5 mr-2 rtl:ml-2 group-hover:-translate-x-2 transition-transform duration-200" />
                  </span>
                </Link>
              </motion.div>

              {/* <button className="btn btn-outline btn-lg group">
                <PlayIcon className="w-5 h-5 mr-2 rtl:ml-2" />
                تماشای ویدیو
              </button> */}
            </motion.div>

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">500+</div>
                <div className="text-sm text-neutral-600">شرکت‌کننده</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">24</div>
                <div className="text-sm text-neutral-600">ساعت مسابقه</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">3</div>
                <div className="text-sm text-neutral-600">سطح مختلف</div>
              </div>
            </div> */}
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            className="relative mb-8 lg:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-64 sm:h-80 lg:h-[500px] hidden lg:block">
              {/* Main Card - Terminal Window */}
              <motion.div
                className="absolute inset-0 terminal-window shadow-2xl"
                initial={{ rotate: 3, scale: 0.9 }}
                animate={isVisible ? { rotate: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ rotate: 0, scale: 1.02, y: -5 }}
              >
                <div className="p-8 h-full flex flex-col justify-between text-white">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <motion.div
                        className="w-3 h-3 bg-red-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-yellow-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                    <motion.div
                      className="text-sm font-mono text-green-400"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      CodoCodile 2025
                    </motion.div>
                  </div>

                  {/* Code Preview with Typing Animation */}
                  <div
                    className="space-y-4 flex-1 flex flex-col justify-center"
                    style={{ direction: "ltr" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent-400 text-lg font-bold">
                        $
                      </span>
                      <span className="text-white text-lg font-mono">
                        coder@codocodile
                      </span>
                      <motion.span
                        className="text-primary-400"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ▊
                      </motion.span>
                    </div>
                    <div className="space-y-2 text-sm font-mono opacity-90 bg-neutral-800/50 p-4 rounded-lg border border-primary-500/20">
                      <pre className="text-xs text-green-400">
                        ✓ Compiling...
                      </pre>
                      <pre className="text-xs text-yellow-400">
                        ✓ Running tests...
                      </pre>
                      <div className="mt-4">
                        <pre className="text-accent-300 whitespace-pre-wrap">
                          {typedText}
                          <motion.span
                            className="inline-block w-2 h-4 bg-accent-400 ml-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        </pre>
                      </div>
                    </div>
                  </div>

                  {/* Footer with Contest Stats */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-700">
                    <div className="flex items-center gap-4">
                      <div className="text-xs opacity-75 font-mono">
                        <span className="text-green-400">Status:</span> Ready
                      </div>
                      <div className="text-xs opacity-75 font-mono">
                        <span className="text-blue-400">Problems:</span> 12
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="text-xs font-mono text-green-400">
                        Online
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Contest Elements */}
              <motion.div
                className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-16 lg:h-16 bg-accent-400 rounded-2xl shadow-glow-accent flex items-center justify-center text-white font-bold text-lg lg:text-xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✓
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-10 h-10 lg:w-12 lg:h-12 bg-primary-300 rounded-xl shadow-glow flex items-center justify-center text-white font-bold text-sm lg:text-base"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                  ease: "easeInOut",
                }}
              >
                #
              </motion.div>
              <motion.div
                className="hidden lg:flex absolute top-1/2 -left-8 w-8 h-8 bg-accent-500 rounded-lg shadow-medium items-center justify-center text-white text-xs font-mono"
                animate={{
                  x: [0, -10, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut",
                }}
              >
                {"{ }"}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center relative group cursor-pointer">
          <motion.div
            className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.span
            className="absolute -bottom-6 text-primary-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
