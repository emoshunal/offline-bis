<template>
    <div class="p-6 bg-base-200 min-h-screen">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-2xl font-bold">Certificate Templates — Barangay</h1>
                <div class="flex gap-2">

                    <button @click="exportArea" class="btn btn-primary">Export PDF</button>
                    <button @click="printPreview" class="btn btn-ghost">Print</button>
                </div>
            </div>

            <!-- <div class="card bg-white shadow-md w-[800px] p-6" id="certificate-area"> -->
            <div id="certificate-area"
                class="relative bg-white shadow-lg mx-auto p-12 w-[794px] min-h-[1123px] overflow-hidden">
                <!-- Watermark -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                    <img src="../assets/barangay-logo.png" alt="Watermark" class="w-[500px] h-[500px] object-contain" />
                </div>

                <div class="relative mb-6">
                    <div class="flex items-start justify-between">
                        <!-- Logo on the left -->
                        <img src="../assets/barangay-logo.png" alt="Barangay Logo" class="w-24 h-24 object-contain" />

                        <!-- Centered header text -->
                        <div class="flex-1 text-center">
                            <h2 class="text-xl font-semibold">Republic of the Philippines</h2>
                            <h3 class="text-lg font-medium">Province of {{ province }}</h3>
                            <h3 class="text-lg font-medium">Municipality of {{ municipality }}</h3>
                            <h4 class="text-base font-semibold">
                                BARANGAY {{ barangay.toUpperCase() }}
                            </h4>
                            <p class="font-bold text-xl uppercase mt-4">OFFICE OF THE PUNONG BARANGAY</p>
                        </div>

                        <img src="../assets/Bagong_Pilipinas_logo.png" alt="Barangay Logo"
                            class="w-24 h-24 object-contain" />

                    </div>

                    <hr class="my-4 border-gray-300 border-2" />
                    <div class="text-right mb-4">
                        Control No.: <span class="font-semibold">{{ resident.control_number }}</span>
                    </div>
                </div>

                <!-- Body -->
                <div class="relative text-gray-900 leading-relaxed text-justify">
                    <h1 class="text-2xl font-bold text-center underline mb-8">
                        CERTIFICATE OF RESIDENCY
                    </h1>

                    <p class="indent-8 mb-4">
                        This is to certify that
                        <span class="font-semibold underline decoration-gray-400">{{
                            resident.name
                            }}</span>, of legal age, <span class="font-semibold underline decoration-gray-400">{{
                            resident.marital_status
                            }}</span>, and a citizen of the <span
                            class="font-semibold underline decoration-gray-400">Republic of the Philippines</span>
                        is a bonafide resident of <span class="font-semibold underline decoration-gray-400">{{
                            resident.house_no_st }}, {{ resident.sitio }}</span>
                        <span class="font-semibold underline decoration-gray-400">{{
                            resident.address
                            }}</span>
                        <span class="font-semibold underline decoration-gray-400"> Barangay {{
                            barangay
                            }}, {{ municipality }}, {{ province }}</span>.
                    </p>
                    <p class="indent-8 mb-4">
                        Based on the records of this Barangay, the above-named person has been residing at the stated
                        address since
                        <span class="font-semibold underline decoration-gray-400">{{
                            resident.residingSince
                            }}</span> up to present.
                    </p>
                    <p class="indent-8 mb-4">
                        This certification is being issued upon the request of the interested party for the purpose of
                        <span class="font-semibold underline decoration-gray-400">{{
                            resident.purpose
                            }}
                        </span>.
                    </p>

                    <p class="mt-8">
                        Given this
                        <span class="font-semibold underline decoration-gray-400">{{ day }}</span>
                        day of
                        <span class="font-semibold underline decoration-gray-400">{{
                            monthYear
                            }}</span>
                        , at Barangay {{ barangay }}, {{ municipality }}, {{ province }}.
                    </p>
                </div>

                <!-- Footer (Signatures) -->
                <div class="relative mt-16 flex justify-between">
                    <!-- Left Section -->
                    <div class="w-1/2">
                        <p class="text-sm tracking-wide mb-8">Certified by: </p>
                        <p class="font-semibold underline decoration-gray-400">
                            Hon. {{ punongBarangay }}
                        </p>
                        <p class="text-sm uppercase tracking-wide">Punong Barangay</p>
                    </div>

                    <!-- Right Section (Signature Box) -->
                    <div class="w-1/3 text-center">
                        <div class="border border-dashed p-4 h-24 flex flex-col justify-end">
                            <p class="font-semibold uppercase tracking-wider">{{ resident.name }}</p>
                            <p class="text-sm italic text-gray-600">
                                Signature over printed name
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Footer line -->
                <!-- Footer -->
                <div class="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-600 font-serif">
                    <hr class="mb-2 border-gray-300 w-[80%] mx-auto" />
                    <p>Barangay {{ barangay }}, {{ municipality }}, Province of {{ province }}</p>
                    <p class="mt-1 font-semibold text-gray-700 uppercase tracking-wide">
                        This document is valid only with the official dry seal
                    </p>
                </div>

            </div>


        </div>
        <div v-if="busy" class="fixed inset-0 bg-black/30 flex items-center justify-center text-white">
            Generating PDF...
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const route = useRoute();
const rawData = route.query.data ? decodeURIComponent(route.query.data) : null;
const parseData = rawData ? JSON.parse(rawData) : {};
const busy = ref(false);
const barangay = ref('Rabon');
const municipality = ref('San Fabian');
const province = ref('Pangasinan');
const punongBarangay = ref('Ronaldo Caguya');


console.log("Received certificate data:", parseData);
const resident = ref({
    name: parseData.resident_name,
    purpose: parseData.purpose,
    marital_status: parseData.marital_status,
    house_no_st: parseData.house_no_st,
    sitio: parseData.sitio,
    control_number: parseData.control_number,
    residingSince: parseData.resident_since ? new Date(parseData.resident_since).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "",
    date_issued: parseData.date_issued
        ? (() => {
            const date = new Date(parseData.date_issued);
            const day = date.getDate();
            const month = date.toLocaleString('en-US', { month: 'long' });
            const year = date.getFullYear();
            return `Issued this ${day} day of ${month}, ${year}`;
        })()
        : "",
});

const issuedAtInput = ref(new Date().toISOString().slice(0, 10));

const issuedAt = computed(() => new Date(issuedAtInput.value));
const day = computed(() => issuedAt.value.getDate());
const monthYear = computed(() => {
    const opts = { month: 'long', year: 'numeric' };
    return issuedAt.value.toLocaleDateString(undefined, opts);
});
const formattedDate = computed(() => issuedAt.value.toLocaleDateString());

function printPreview() {

    window.print();
}



async function exportArea() {
    try {
        busy.value = true;

        const el = document.getElementById("certificate-area");
        if (!el) return alert("Printable area not found");

        // Wait briefly to ensure all elements (like logos) are rendered
        await new Promise(r => setTimeout(r, 200));

        // Render the element to a high-resolution canvas
        const canvas = await html2canvas(el, {
            scale: 2, // higher = sharper text, but larger file
            useCORS: true, // allow loading images like your logo
            backgroundColor: "#ffffff", // ensure white background
        });

        // Convert the rendered canvas to a PNG image
        const imgData = canvas.toDataURL("image/png");

        // Create a jsPDF instance (A4 page)
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Compute proper sizing for A4
        const margin = 10; // in mm
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);


        // If image taller than one page → split across multiple pages
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + 10;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 20;
        }

        // Save PDF locally
        pdf.save("certificate.pdf");
    } catch (error) {
        console.error("PDF export failed:", error);
        alert("Error generating PDF.");
    } finally {
        busy.value = false;
    }
}
</script>

<style scoped>
/* @media print {
    body {
        -webkit-print-color-adjust: exact;
    }

    .card {
        box-shadow: none;
    }
}

@media print {
    #certificate-area {
        page-break-inside: avoid;
    }

    body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }
} */
#certificate-area {
    background-color: white;
    margin: 20px auto;
    box-sizing: border-box;
}

@media print {
    #certificate-area {
        margin: 0 auto;
        page-break-inside: avoid;
    }
}
</style>
