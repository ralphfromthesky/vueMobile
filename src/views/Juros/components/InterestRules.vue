<template>

    <div class="w-full p-[.2rem] pb-0 h-[calc(100vh-5.7rem)] overflow-auto">
        <div class="flex flex-col gap-[.2rem] bg-[#05309F] p-[.2rem] rounded-[.1rem] ">
            <span class="text-[.22rem] text-[#A0C5FB]">
                1. Introdução à renda:"O valor depositado no tesouro de juros deve satisfazer pelo menos um
                ciclo completo para gerar juros. Se for transferido antecipadamente, a renda não será calculada
                nesse ciclo. Por exemplo: o ciclo de liquidação atual é de 1 horas, então 2023-01-01 00:00:01 O
                valor transferido acumulará juros no primeiro ciclo em 2023-01-01 01:00:01;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                2. Ciclo de liquidação: O ciclo de liquidação dos juros atuais é de 1;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                3. Taxa de juros anual: A taxa de juros anual atual é15%;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                4. Fórmula de cálcul: Lucro dos juros = valor do depósito * taxa de juros anual / período de
                liquidação;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                5. Exemplo: A deposita 10.000 em 01-01-2023 00:00:01, a taxa de juros anual é 15% e o período de
                liquidação é 1 horas, então a primeira receita de juros é obtida em 2023-01-01 01:00:01. O
                cálculo é o seguinte:"Primeiros juros =10.000*15%/365 dias/24 horas*1 horas = 0.171232
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                6. Limiar de torneamento: A quantidade de cada transferência deve ser maior que igual a20(ou
                seja, ≥20), a quantidade ilimitada do valor da transferência, quanto maior a maior renda;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                7. Limite de juros: O limite de juros atual só pode ser liquidado por no máximo 1 períodos. Se
                for excedido, nenhum juro será gerado.
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                8. Receba tempo: Atualmente, é coletado no dia seguinte, ou seja, o interesse gerado naquele dia
                e não será coletado até 0 horas no dia seguinte;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                9. Auditoria múltipla: O múltiplo de audição atual é1 Times (requisitos de fluxo de apostas), ou
                seja, os juros recebidos, você precisa obter a apostaPlataforma válida ilimitadaApenas os juros
                recebidos requerem auditoria, enquanto o valor principal transferido para dentro ou para fora
                não requer auditoria;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                10. Declaração do evento: Esta função é limitada à conta. Tenho uma apostas normal de jogo e é
                proibido alugar uma conta, sem apostas de risco (para jogos de azar, emparelhamento, baixa
                compensação, escovar água), Arbitragem maliciosa, usando processos de plug -in, robôs, robôs
                utilizam acordos, vulnerabilidades, interfaces,O controle de grupo ou outros meios técnicos são
                proibidos. Uma vez verificado, a plataforma reserva o direito de encerrar os logins dos membros,
                suspender o uso do site pelos membros e confiscar bônus e lucros impróprios sem aviso prévio;
            </span>
            <span class="text-[.22rem] text-[#A0C5FB]">
                11. Explicação: Quando um membro recebe a recompensa Yibao, a plataforma presumirá que o membro
                concorda e cumpre as condições correspondentes e outros regulamentos relevantes. Para evitar
                ambiguidade na compreensão do texto, a plataforma reserva-se a final. direito de interpretar
                este evento;
            </span>
        </div>
    </div>
</template>
<script setup>
import PageLayout from '@/components/layout/Layout.vue';
</script>